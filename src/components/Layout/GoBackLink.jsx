import React from 'react'
import { Link } from 'react-router-dom'

export default function GoBackLink() {
  return (
    <div className='go-back'>
      <Link to='..'>Go Back</Link>
    </div>
  )
}
