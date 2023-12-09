import React, { useEffect, useState } from 'react'
import GoBackLink from '../../Layout/GoBackLink'
import { useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../api/axios';
import Loading from '../../Layout/Loading';
import { Col, Row, Container, Button } from 'reactstrap';
import './ViewAnswers.css';
import PollQuestion from './PollQuestion';

const PollSummary = () => {

  const { id } = useParams();
  const { auth } = useAuth();
  const [poll, setPoll] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPoll = async () => {
    try {
      const response = await axios.get(`/polls/${id}?include_answers=true`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        },
        withCredentials: true
      });
      setPoll(response.data.foundPoll);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPoll();
  }, []);

  return (
    <>
      {isLoading
        ?
        <Loading />
        :
        <div className='poll-summary'>

          <GoBackLink />
          {poll?.answers?.length > 0
            ?
            < Container fluid={'md'} className='layout d-flex flex-column gap-3'>
              <Row className='header'>
                <Col xs={12} lg={!poll.image_path ? 12 : 8} className='d-flex flex-column gap-3'>
                  <p>{poll.title}</p>
                  <p>{poll.description}</p>
                  <p>Replies: {poll.answers.length}</p>

                </Col>
                {poll.image_path && <Col xs={12} lg={4} className='poll-image'>
                  <img src={`http://localhost:3500${poll.image_path}`} alt="poll_image" />
                </Col>}
              </Row>
              {poll.questions.map(question => <PollQuestion key={question.title} title={question.title} answers={question.answers} poll_answers={poll.answers} />)}
            </Container>
            :
            <p className='mt-5'>No one answered this poll yet</p>
          }
        </div>}
    </>
  )
}

export default PollSummary
