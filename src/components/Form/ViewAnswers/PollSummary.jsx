import React from 'react'
import GoBackLink from '../../Layout/GoBackLink'
import { useLocation } from 'react-router-dom'

const PollSummary = () => {

  const location = useLocation();

  return (
    <div className='d-flex justify-content-center align-items-center'>
      <GoBackLink />
      {location?.state?.poll?.answers?.length > 0
        ?
        <pre className='mt-5'>{JSON.stringify(location.state.poll.answers, null, 2)}</pre>
        :
        <p className='mt-5'>No one answered this poll yet</p>
      }
    </div>
  )
}

export default PollSummary