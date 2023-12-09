import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap';
import axios from '../../../api/axios';
import GoBackLink from '../../Layout/GoBackLink'
import useAuth from '../../../hooks/useAuth';
import UserAnswers from './UserAnswers';

const ViewAnswers = () => {

    const { id } = useParams();
    const { auth } = useAuth();
    const location = useLocation();
    const [userAnswers, setUserAnswers] = useState([]);
    const [poll, setPoll] = useState({});

    useEffect(() => {
        if(location?.state?.poll && location?.state?.userAnswers) {
            setPoll(location.state.poll);
            setUserAnswers(location.state.userAnswers);
        } else {
            getPollDataAndUserAnswers();
        }
    }, [location]);

    const getPollDataAndUserAnswers = async () => {
        try {
            let response = await axios.get(`/polls/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`
                },
                withCredentials: true
            });
            setPoll(response.data.foundPoll);
            response = await axios.get(`/polls/${id}/get_poll_answers`, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`
                },
                withCredentials: true
            });
            setUserAnswers(response.data.userAnswers);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='view-answers'>
            <GoBackLink />
            {
                <Container fluid={'md'} className='layout d-flex flex-column gap-3'>
                    {poll && userAnswers?.length > 0
                        ?
                        <>
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
                        </>
                        :
                        <p className='text-center'>You didn't submit your answer for this poll</p>
                    }
                </Container>
            }
        </div>
    )
}

export default ViewAnswers