import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap'
import { Link } from 'react-router-dom';
import Template from './Template';
import Search from '../Search';
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';



const Templates = ({ setTemplatesCount }) => {
    const { auth } = useAuth();

    const axiosPrivate = useAxiosPrivate();

    const [templates, setTemplates] = useState([]);
    const [searchResult, setSearchResult] = useState([]);

    const setTemplate = (templateId, updatedTemplate) => {
        if (updatedTemplate) {
            setTemplates(prev => prev.map(template => template._id === templateId ? updatedTemplate : template));
        } else {
            updatedTemplate = templates.filter(template => template._id !== templateId)
            setTemplates(updatedTemplate);
            setSearchResult(updatedTemplate);
        }
    }

    useEffect(() => {
        setTemplatesCount(searchResult.length);
    }, [searchResult.length])

    const getTemplates = async () => {
        try {
            const response = await axiosPrivate.get('/polls/templates?get_hidden=true&with_fields=true');
            setTemplates(response.data.templates);
            setSearchResult(response.data.templates);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if(auth.admin) {
            getTemplates();
        }
    }, [auth]);

    const searchTemplates = (searchValue) => {
        if (searchValue.length > 0) {
            setSearchResult(templates.filter(template => template.title.toLowerCase().includes(searchValue.toLowerCase())));
        }
    }

    const th = ['Title', 'Show', 'Actions']

    return (
        <div className="templates">
            <Search
                data={templates}
                searchFunc={searchTemplates}
                setSearchResult={setSearchResult}
                placeholder={'Search by title'}
            />
            <div className='mt-3 d-flex justify-content-start gap-2'>
                <Link to={'/template/create'}><button className='btn btn-warning'>Add new template</button></Link>
            </div>
            <Table size='sm' hover responsive className='mt-2'>
                <thead>
                    <tr>
                        {th.map((item, index) => <th key={index} className='p-2'>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {searchResult?.map((template, index) => <Template key={index} template={template} setTemplate={setTemplate} />)}
                </tbody>
            </Table>
        </div>
    )
}

export default Templates