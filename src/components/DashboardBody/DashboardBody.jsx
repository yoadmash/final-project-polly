import NewPoll from '../NewPoll/NewPoll';
import Polls from '../Polls/Polls';
import useRefreshToken from '../../hooks/useRefreshToken';
import { useEffect } from 'react';

export default function DashboardBody() {

  const refresh = useRefreshToken();

  useEffect(() => {
    refresh();
  },[]);

  return (
    <div className='dashboard-body'>
      <NewPoll />
      <Polls />
    </div>
  )
}