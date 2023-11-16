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
    try {
      const response = await axios.get('/users/get_polls', {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        },
        withCredentials: true
      });
      setPolls(response.data);
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
                {polls.map(poll => <PollCard key={poll} id={poll} managePolls={{polls: polls, setPolls: setPolls}} />)}
              </div>
            }
          </div>
      }
    </>
  )
}