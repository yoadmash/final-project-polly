import React from 'react';
import './Logs.css';
import { useEffect, useState, useRef } from 'react';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { Input, Table } from 'reactstrap';

const Logs = ({ setViewLogs }) => {

    const { auth } = useAuth();
    const main = useRef();
    const input = useRef();
    const [logsList, setLogsList] = useState([]);
    const [selectedLog, setSelectedLog] = useState('');
    const [content, setContent] = useState([]);
    const [logFields, setLogFields] = useState([]);

    const getLogsList = async () => {
        try {
            const response = await axios.get('/logs', {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`
                },
                withCredentials: true
            });
            setLogsList(response.data.log_types);
        } catch (err) {
            console.log(err.response.data);
            setViewLogs(false);
        }
    }

    const getLog = async (log) => {
        if(log.length > 0) {
            const response = await axios.get(`/logs?log=${log}`, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`
                },
                withCredentials: true
            });
            setSelectedLog(log);
            if (response.status === 200) {
                setContent(response.data.content)
                setLogFields(Object.keys(response.data.content[0]));
            } else {
                setContent([]);
                setLogFields([]);
            }
        }
    }

    const clearLog = async (log) => {
        await axios.get(`/logs?log=${log}&clear=true`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`
            },
            withCredentials: true
        });
        setLogFields([]);
        setContent([]);
    }

    useEffect(() => {
        getLogsList();
        main.current.focus();
    }, []);

    return (
        <div className='logs' tabIndex={0} ref={main} >
            <div className="header">
                <h1>{logsList.length > 0 ? 'Logs' : 'No Logs'}</h1>
                <button className='btn btn-success' onClick={() => setViewLogs(false)}>Close</button>
            </div>
            {logsList.length > 0
                && <div className="body">
                    <Input type='select' onInput={(e) => getLog(e.target.value)}>
                        <option hidden>Select a Log</option>
                        {logsList.map((log, index) => <option key={index} value={log}>{log}</option>)}
                    </Input>
                    {selectedLog
                        && <div className="content">
                            <div className='d-flex mb-3 justify-content-between align-items-center'>
                                <h4>{selectedLog} logs</h4>
                                {content.length > 0 && <button className='btn btn-danger' onClick={() => clearLog(selectedLog)}>Clear Log</button>}
                            </div>
                            {logFields.length > 0 && <Table size='sm' hover bordered responsive>
                                <thead>
                                    <tr>
                                        {logFields.map((field, index) => <th key={index}>{field}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {content.map((log) => (
                                        <tr key={log._id} className={log.is_error === 'true' ? 'table-danger' : ''}>
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