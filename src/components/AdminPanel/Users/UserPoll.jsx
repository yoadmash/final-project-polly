import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';

const UserPoll = ({ id }) => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const [poll, setPoll] = useState(undefined);

    const getPoll = async () => {
        try {
            const response = await axiosPrivate.post('/polls/search', { searchValue: id });
            setPoll(response.data.searchResults[0]);
        } catch (err) {
            console.log(err);
        }
    }

    const navigateToPoll = () => {
        navigate(`/poll/${id}`);
        // navigate(0);
    }

    useEffect(() => {
        getPoll();

    }, [])

    return (
        <>
            {poll && <div className='modal-poll-card' onClick={() => { navigateToPoll() }}>
                <img src={poll.image_path || '/assets/images/view_answers.svg'} alt="poll_image" />
                <div>
                    <h4>{poll.title}</h4>
                    <p>{poll.owner.username}</p>
                    <p>{poll.creation_date}, {poll.creation_time}</p>
                </div>
            </div>}
        </>
    )
}

export default UserPoll