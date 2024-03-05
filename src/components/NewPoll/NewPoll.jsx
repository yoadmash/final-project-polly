import './NewPoll.css'
import React, { useEffect, useState } from 'react'
import NewPollCard from './NewPollCard'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function NewPoll() {

  const axiosPrivate = useAxiosPrivate();
  const [templates, setTemplates] = useState([]);

  const getNewPollTemplates = async () => {
    try {
      const response = await axiosPrivate.get('/polls/templates');
      setTemplates(response.data.templates);
    } catch (err) {
      console.log(err);
    }
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
        {templates.length > 0 && templates.map(template => <NewPollCard key={template._id} template={template} title={template.title} />)}
      </div>
    </div>
  )
}