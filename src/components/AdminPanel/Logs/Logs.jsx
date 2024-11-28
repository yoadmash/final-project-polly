import React from 'react';
import { useEffect, useState } from 'react';
import { Input, Table } from 'reactstrap';
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import './Logs.css';
import { Slide, toast } from 'react-toastify';

const Logs = () => {
    const { auth } = useAuth();

    const axiosPrivate = useAxiosPrivate();
    const [logsList, setLogsList] = useState([]);
    const [selectedLog, setSelectedLog] = useState('Select a log');
    const [content, setContent] = useState([]);
    const [logFields, setLogFields] = useState([]);

    const getLogsList = async () => {
        try {
            const response = await axiosPrivate.get('/logs');
            setLogsList(response.data.log_types);
        } catch (err) {
            console.log(err);
        }
    }

    const getLog = async (log) => {
        if (log.length > 0 && logsList.includes(log)) {
            try {
                const response = await axiosPrivate.get(`/logs?log=${log}`);
                setSelectedLog(log);
                if (response.status === 200) {
                    setContent(response.data.content)
                    setLogFields(Object.keys(response.data.content[0]));
                } else {
                    setContent([]);
                    setLogFields([]);
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            setSelectedLog('Select a log');
            setContent([]);
            setLogFields([]);
        }
    }

    const clearLog = async (log) => {
        try {
            await axiosPrivate.get(`/logs?log=${log}&clear=true`);
            const filteredLogsList = logsList.filter(logItem => logItem !== log);
            setLogsList(filteredLogsList);
            setSelectedLog('Select a log');
            setContent([]);
            setLogFields([]);
            toast.success('Log cleared', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                theme: "light",
                transition: Slide,
            })

        } catch (err) {
            toast.error(err || 'An error has been occurred', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                theme: "light",
                transition: Slide,
            })
        }
    }

    useEffect(() => {
        if (auth.admin) {
            getLogsList();
        }
    }, [auth.admin]);

    return (
        <div className='logs'>
            <div className="header mt-3">
                {logsList.length === 0 && <h2>No Logs</h2>}
                {logsList.length === 0 && <button className='btn btn-warning' onClick={() => getLogsList()}>Refresh</button>}
            </div>
            {logsList.length > 0
                && <div className="body mt-3">
                    <div className='d-flex justify-content-between gap-3'>
                        <Input type='select' onInput={(e) => getLog(e.target.value)} value={selectedLog}>
                            <option hidden>Select a log</option>
                            {logsList.map((log, index) => <option key={index} value={log}>{log}</option>)}
                        </Input>
                        {<button className='btn btn-warning' onClick={() => {
                            getLogsList();
                            if (logsList.includes(selectedLog)) {
                                getLog(selectedLog);
                            }
                        }}>Refresh</button>}
                        {content.length > 0 && <button className='btn btn-danger' onClick={() => clearLog(selectedLog)}>Clear</button>}
                    </div>
                    {selectedLog && logsList.includes(selectedLog)
                        && <div className="content">
                            <h4>{selectedLog} logs ({content.length})</h4>
                            {logFields.length > 0 && <Table size='sm' hover responsive>
                                <thead>
                                    <tr>
                                        {logFields.map((field, index) => <th key={index}>{field}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {content.map((log, index) => (
                                        <tr key={index} className={log.is_error === 'true' ? 'table-danger' : ''}>
                                            {Object.values(log).map((value, index) => <td key={index}>{value}</td>)}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>}
                        </div>}
                </div>}
        </div>
    )
}

export default Logs