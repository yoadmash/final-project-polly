import React from 'react'
import './DashboardBody.css'
import NewPoll from '../NewPoll/NewPoll'
import Polls from '../Polls/Polls'

export default function DashboardBody() {
  return (
    <div className='dashboard-body'>
      <NewPoll />
      <Polls />
    </div>
  )
}