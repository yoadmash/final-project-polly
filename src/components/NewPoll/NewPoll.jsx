import React from 'react'
import './NewPoll.css'
import NewPollCard from './NewPollCard'

export default function NewPoll() {
  return (
    <div className='dashboard-newpoll'>
      <div className="header">
        <span>Create a new poll</span>
      </div>
      <div className="body">
        <NewPollCard template={false} />
        {/* <NewPollCard template title='Is Alex Gay?' />
        <NewPollCard template title='Is Alex Straight?' /> */}
      </div>
    </div>
  )
}