import React from 'react'

const PollPic = ({ src }) => {
    return (
        <div className='p-2'>
            <img src={src || '/assets/images/view_answers.svg'} alt="poll pic" className='poll-pic' />
        </div>
    )
}

export default PollPic