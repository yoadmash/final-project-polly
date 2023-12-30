import './NewPoll.css'
import React, { useEffect, useState } from 'react'
import NewPollCard from './NewPollCard'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function NewPoll() {

  const axiosPrivate = useAxiosPrivate();
  const [templates, setTemplates] = useState([]);

  const getNewPollTemplates = async () => {
    const response = await axiosPrivate.get('/polls/templates');
    setTemplates(response.data.templates);
  }

  useEffect(() => {
    getNewPollTemplates();
  }, []);

  return (
    <div className='dashboard-newpoll'>
      <div className="header">
        <span>Create a new poll</span>
      </div>
      <div className="body">
        <NewPollCard />
        {templates.length > 0 && templates.map(template => <NewPollCard key={template.name} template title={template.name} />)}
      </div>
    </div>
  )
}