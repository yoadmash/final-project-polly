import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { Table } from 'reactstrap'
import Template from './Template';

const Templates = () => {

    const axiosPrivate = useAxiosPrivate();

    const [templates, setTemplates] = useState([]);

    const getTemplates = async () => {
        try {
            const response = await axiosPrivate.get('/polls/templates?with_fields=true');
            setTemplates(response.data.templates);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getTemplates();
    }, []);

    const th = ['Title', 'Show', 'Actions'] // actions = show/hide, edit, delete

    return (
        <div className="templates">
            <Table size='sm' hover responsive className='mt-2'>
                <thead>
                    <tr>
                        {th.map((item, index) => <th key={index} className='p-2'>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {templates?.map((template, index) => <Template key={index} template={template} />)}
                </tbody>
            </Table>
        </div>
    )
}

export default Templates