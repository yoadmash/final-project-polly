import React from 'react'
import { useNavigate } from 'react-router-dom'

const PollCardSearch = ({ poll, id }) => {
    const navigate = useNavigate();

    const navigateToPoll = () => {
        navigate(`/poll/${id}`);
        navigate(0);
    }

    return (
        <div className='poll-card-search' onClick={() => { navigateToPoll() }}>
            <img src={(poll.image_path ? `http://localhost:3500${poll.image_path}` : '/assets/images/view_answers.svg')} alt="img" />
            <div>
                <h4>{poll.title}</h4>
                <p>{poll.owner.username}</p>
                <p>{poll.creation_date}, {poll.creation_time}</p>
            </div>
        </div>
    )
}

export default PollCardSearch