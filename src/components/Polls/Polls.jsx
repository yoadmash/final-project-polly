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
  const [isLoading, setIsLoading] = useState(false);

  const getPolls = async () => {
    setIsLoading(true);
    const result = await axios.get('/users/get_polls', {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`
      },
      withCredentials: true
    });
    setPolls(result.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getPolls();
  }, []);

  return (
    <>
      {
        polls.length === 0
          ? <></>
          :
          <div className='dashboard-polls'>
            <div className="header">
              <span>Polls</span>
              <PollSort />
            </div>
            {isLoading
              ? <ReactLoading type='bubbles' color='#000000' width={'100px'} height={'100px'} />
              :
              <div className="body">
                {polls.map(poll => <PollCard key={poll} id={poll} />)}
              </div>
            }
          </div>
      }
    </>
  )
}