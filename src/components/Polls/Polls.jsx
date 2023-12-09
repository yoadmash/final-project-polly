import './Polls.css';
import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import PollCard from './PollCard';
import PollSort from './PollSort';
import useAuth from '../../hooks/useAuth';
import ReactLoading from 'react-loading';

export default function Polls() {
  const { auth } = useAuth();
  const [polls, setPolls] = useState([]);
  const [pollsToRender, setPollsToRender] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPolls = async () => {
    try {
      const response = await axios.get('/users/get_polls', {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        },
        withCredentials: true
      });
      const { created, answered, visited } = response.data;
      setPollsToRender([...created, ...answered, ...visited]);
      setPolls({ created, answered, visited });
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getPolls();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='dashboard-polls'>
      <div className="header">
        <span>Polls ({pollsToRender?.length})</span>
        <PollSort polls={polls} setPollsToRender={setPollsToRender} />
      </div>
      {isLoading
        ? <ReactLoading type='bubbles' color='#000000' width={'100px'} height={'100px'} />
        :
        <div className="body">
          {pollsToRender.length > 0 && pollsToRender?.map(poll => <PollCard key={poll} id={poll} managePolls={{ polls: pollsToRender, setPolls: setPollsToRender }} />)}
        </div>
      }
    </div>
  )
}