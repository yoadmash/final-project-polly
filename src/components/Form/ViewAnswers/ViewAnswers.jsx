import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import GoBackLink from '../../Layout/GoBackLink'
import useAuth from '../../../hooks/useAuth';
import { Container, Row, Col } from 'reactstrap';
import UserAnswers from './UserAnswers';

const ViewAnswers = () => {

    const { auth } = useAuth();
    const location = useLocation();
    const [userAnswers, setUserAnswers] = useState([]);
    const [poll, setPoll] = useState({});

    useEffect(() => {
        if (location?.state?.poll) {
            setPoll(location.state.poll);
            setUserAnswers(location.state.poll.answers.find(data => data.answered_by === auth.userId)?.answers);
        }
    }, [location, auth]);

    return (
        <div className='view-answers'>

            {
                (userAnswers && location?.state?.poll
                    ?
                    <Container fluid={'md'} className='layout d-flex flex-column gap-3'>
                        <GoBackLink />
                        <Row className='header'>
                            <Col xs={12} lg={!poll.image_path ? 12 : 8} className='d-flex flex-column gap-3'>
                                <p>{poll.title}</p>
                                <p>{poll.description}</p>
                            </Col>
                            {poll.image_path && <Col xs={12} lg={4} className='poll-image'>
                                <img src={`http://localhost:3500${poll.image_path}`} alt="poll_image" />
                            </Col>}
                        </Row>
                        <UserAnswers poll_questions={poll.questions} user_answers={userAnswers} />
                    </Container>
                    :
                    <Navigate to={'/'} />
                )
            }
        </div>
    )
}

export default ViewAnswers