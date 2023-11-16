import React, { useEffect, useState } from 'react'
import GoBackLink from '../../Layout/GoBackLink'
import { Navigate, useLocation } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth';

const ViewAnswers = () => {

    const { auth } = useAuth();
    const location = useLocation();
    const [userAnswers, setUserAnswers] = useState([]);

    useEffect(() => {
        if (location?.state?.poll) {
            setUserAnswers(location.state.poll.answers.find(data => data.answered_by === auth.userId)?.answers);
        }
    }, [location]);

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <GoBackLink />
            {
                (userAnswers && location?.state?.poll
                    ?
                    <div className="view-answers mt-5">
                        <p>You've already answered this poll.</p>
                        <pre>{JSON.stringify(userAnswers, null, 2)}</pre>
                    </div>
                    :
                    <Navigate to={'/'} />
                )
            }
        </div>
    )
}

export default ViewAnswers