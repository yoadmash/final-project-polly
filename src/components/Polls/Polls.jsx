import './Polls.css';
import React, { useEffect, useState } from 'react';
import PollCard from './PollCard';
import PollSort from './PollSort';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import ReactLoading from 'react-loading';

export default function Polls() {

  const axiosPrivate = useAxiosPrivate();
  const [polls, setPolls] = useState([]);
  const [pollsToRender, setPollsToRender] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPolls = async () => {
    try {
      const response = await axiosPrivate.get('/users/get_polls');
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
  }, []);

  return (
    <div className='dashboard-polls'>
      <div className="header">
        <span>Polls ({pollsToRender?.length})</span>
        <PollSort polls={polls} setPollsToRender={setPollsToRender} />
      </div>
      {isLoading
        ? <ReactLoading type='bubbles' color='#00bf63' width={'100px'} height={'100px'} />
        :
        <div className="body">
          {pollsToRender.length > 0 && pollsToRender?.map(poll => <PollCard key={poll} id={poll} managePolls={{ polls: pollsToRender, setPolls: setPollsToRender }} />)}
        </div>
      }
    </div>
  )
}