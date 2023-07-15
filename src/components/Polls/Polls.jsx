import React from 'react'
import './Polls.css'
import PollCard from './PollCard'
import PollSort from './PollSort'

export default function Polls() {
  return (
    <div className='dashboard-polls'>
      <div className="header">
        <span>Polls</span>
        <PollSort />
      </div>
      <div className="body">
        <PollCard title={"My Poll1"} creation_date={new Date().toLocaleDateString('en-GB')} preview_img={'/assets/images/preview.svg'}/>
        <PollCard title={"My Poll2"} creation_date={new Date().toLocaleDateString('en-GB')} preview_img={'/assets/images/preview.svg'}/>
        <PollCard title={"My Poll3"} creation_date={new Date().toLocaleDateString('en-GB')} preview_img={'/assets/images/preview.svg'}/>
        <PollCard title={"My Poll4"} creation_date={new Date().toLocaleDateString('en-GB')} preview_img={'/assets/images/preview.svg'}/>
        <PollCard title={"My Poll5"} creation_date={new Date().toLocaleDateString('en-GB')} preview_img={'/assets/images/preview.svg'}/>
        <PollCard title={"My Poll6"} creation_date={new Date().toLocaleDateString('en-GB')} preview_img={'/assets/images/preview.svg'}/>
      </div>
    </div>
  )
}