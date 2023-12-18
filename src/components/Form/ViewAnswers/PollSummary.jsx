import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Col, Row, Container, Modal, ModalHeader, ModalBody } from 'reactstrap';
import GoBackLink from '../../Layout/GoBackLink'
import Loading from '../../Layout/Loading';
import PollQuestion from './PollQuestion';
import UserAnswered from './UserAnswered';
import UserAnswers from './UserAnswers';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import './ViewAnswers.css';

const PollSummary = () => {

  const axiosPrivate = useAxiosPrivate();

  const { id } = useParams();

  const [poll, setPoll] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState('all');
  const [usersAnswered, setUsersAnswered] = useState([]);
  const [modal, setModal] = useState(false);


  const getPoll = async () => {
    try {
      const response = await axiosPrivate.get(`/polls/${id}?include_answers=true`);
      setPoll(response.data.foundPoll);
      const usersAnsweredArr = [];
      response.data.foundPoll.answers.length > 0 && response.data.foundPoll.answers.forEach(answer => usersAnsweredArr.push(answer.answered_by));
      setUsersAnswered(usersAnsweredArr);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  const toggle = () => setModal(!modal);

  useEffect(() => {
    setModal(false);
  }, [userAnswers]);

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
          <Container fluid={'md'} className='layout d-flex flex-column gap-3'>
            {poll && poll?.answers?.length > 0
              ?
              <>
                <Row className='header'>
                  <Col xs={12} lg={!poll.image_path ? 12 : 8} className='d-flex flex-column gap-3'>
                    <p>{poll.title}</p>
                    {!poll.settings.submitAnonymously && <p className='show-users-list' onClick={toggle}>Show answers</p>}
                  </Col>
                  {poll.image_path && <Col xs={12} lg={4} className='poll-image'>
                    <img src={process.env.REACT_APP_API_URL + poll.image_path} alt="poll_image" />
                  </Col>}
                </Row>
                {
                  userAnswers === 'all'
                    ? poll.questions.map((question, index) => <PollQuestion key={question.title} title={question.title} q_index={index} answersType={question.answersType} answers={question.answers} poll_answers={poll.answers} />)
                    : usersAnswered.some(user_data => user_data.user_id === userAnswers)
                      ? <>
                        <h5>{usersAnswered.find(user_data => user_data.user_id === userAnswers).user_name} answers</h5>
                        <UserAnswers poll_questions={poll.questions} user_answers={poll.answers.find(answer => answer.answered_by.user_id === userAnswers)?.answers} />
                      </>
                      : <p>This user didn't answers this poll</p>
                }
              </>
              :
              <p className='text-center'>No one answered this poll yet</p>
            }
          </Container>
          {modal && <Modal isOpen={modal} centered fade={false}>
            <ModalHeader toggle={toggle}>Select a user to view his answers</ModalHeader>
            <ModalBody className='d-flex flex-column gap-3 users-list-modal-body'>
              <div className='users-list-item d-flex align-items-center gap-3' onClick={() => setUserAnswers('all')}>
                <p>Poll summary</p>
              </div>
              {usersAnswered.length > 0 && usersAnswered.map(user_data => <UserAnswered key={user_data.user_id} user_data={user_data} setUserAnswers={setUserAnswers} />)}
            </ModalBody>
          </Modal>}
        </div>}
    </>
  )
}

export default PollSummary
