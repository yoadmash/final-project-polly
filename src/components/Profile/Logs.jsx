import React from 'react';
import './Logs.css';
import { useEffect, useState, useRef } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Input, Table } from 'reactstrap';

const Logs = ({ setViewLogs }) => {

    const axiosPrivate = useAxiosPrivate();
    const main = useRef();
    const [logsList, setLogsList] = useState([]);
    const [selectedLog, setSelectedLog] = useState('');
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
        if (log.length > 0) {
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
        }
    }

    const clearLog = async (log) => {
        try {
            await axiosPrivate.get(`/logs?log=${log}&clear=true`);
            setContent([]);
            setLogFields([]);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getLogsList();
        main.current.focus();
    }, []);

    return (
        <div className='logs' tabIndex={0} ref={main} >
            <div className="header">
                <h1>{logsList.length > 0 ? 'Logs' : 'No Logs'}</h1>
                <button className='btn btn-danger' onClick={() => setViewLogs(false)}>Close</button>
            </div>
            {logsList.length > 0
                && <div className="body">
                    <Input type='select' onInput={(e) => getLog(e.target.value)}>
                        <option hidden>Select a Log</option>
                        {logsList.map((log, index) => <option key={index} value={log}>{log}</option>)}
                    </Input>
                    {selectedLog
                        && <div className="content p-3">
                            <div className='d-flex mb-3 justify-content-between align-items-center'>
                                <h4>{selectedLog} logs ({content.length})</h4>
                                {content.length > 0 && <button className='btn btn-danger' onClick={() => clearLog(selectedLog)}>Clear Log</button>}
                            </div>
                            {logFields.length > 0 && <Table size='sm' hover bordered responsive>
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