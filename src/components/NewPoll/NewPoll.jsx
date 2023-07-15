import React from 'react'
import './NewPoll.css'
import NewPollCard from './NewPollCard'

export default function NewPoll() {
  return (
    <div className='dashboard-newpoll'>
      <div className="header">
        <span>Start a new poll</span>
      </div>
      <div className="body">
        <NewPollCard template={false} />
        <NewPollCard template />
        <NewPollCard template />
        <NewPollCard template />
        <NewPollCard template />
        <NewPollCard template />
      </div>
    </div>
  )
}