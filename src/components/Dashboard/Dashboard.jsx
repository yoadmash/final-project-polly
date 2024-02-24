import React, { useEffect } from 'react'
import './Dashboard.css'
import DashboardBody from '../DashboardBody/DashboardBody'

export default function Dashboard() {

  useEffect(() => {
    document.title = 'Polly';
  }, []);

  return (
    <div className='dashboard'>
      <DashboardBody />
    </div>
  )
}