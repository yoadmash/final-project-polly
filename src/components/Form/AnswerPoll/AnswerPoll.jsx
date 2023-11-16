import './AnswerPoll.css';
import { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button, Spinner } from 'reactstrap';
import { useNavigate, useParams } from "react-router-dom";
import { useForm, FormProvider, } from 'react-hook-form';
import GoBackLink from '../../Layout/GoBackLink';
import axios from '../../../api/axios';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../Layout/Loading';
import Questions from './Questions';
import ErrMsg from '../../Layout/ErrMsg';

const AnswerPoll = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { auth } = useAuth();

    const [poll, setPoll] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const methods = useForm({
        defaultValues: {
            answered_by: auth.userId,
        },
    })

    const checkIfPollExist = async () => {
        try {
            const response = await axios.get(`/polls/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`
                },
                withCredentials: true
            });
            setPoll(response.data.foundPoll);
            setIsLoading(false);
        } catch (err) {
            navigate('/poll-not-found');
        }
    }

    const checkIfPollAnswered = async () => {
        const result = poll?.answers?.find(item => item.answered_by === auth.userId);
        if (result) {
            navigate(`/poll/${id}/view_answers`, {
                state: {
                    poll
                },
                replace: true
            });
        }
    }

    const showError = (err_msg) => {
        setErrMsg(err_msg);
        setIsLoading(false);
        setTimeout(() => {
            setErrMsg('');
        }, 3000);
    }

    const submitPoll = async (data) => {
        if (poll.settings.submitAnonymously) {
            data = { ...data, answered_by: 'anonymous' }
        }
        try {
            setSubmitting(true);
            await axios.post('/polls/answer_poll', { pollId: id, data }, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`
                },
                withCredentials: true
            });
            navigate(`/`);
        } catch (err) {
            showError(err?.response?.data?.message);
        } finally {
            setSubmitting(false);
        }

    }

    useEffect(() => {
        checkIfPollExist();
    }, []);

    useEffect(() => {
        if (poll) {
            checkIfPollAnswered();
        }
    }, [poll]);

    return (
        <>
            {isLoading
                ?
                <Loading />
                :
                <FormProvider {...methods}>
                    <Form className='answer-poll' onSubmit={methods.handleSubmit(data => submitPoll(data))}>
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
                            <Questions questions={poll.questions} shuffle={poll.settings.shuffleQuestionsOrder} />
                            <Row>
                                <Button
                                    color='success'
                                    disabled={poll.ownerId === auth.userId}
                                >
                                    {!submitting
                                        ?
                                        poll.ownerId !== auth.userId
                                            ?
                                            `Submit ${poll.settings.submitAnonymously ? ' anonymously' : ''}`
                                            :
                                            'You\'re not allowed to answer your own poll'
                                        :
                                        <Spinner size={'sm'} />
                                    }
                                </Button>
                                {errMsg && <ErrMsg msg={errMsg} />}
                            </Row>
                        </Container>
                    </Form>
                </FormProvider>
            }
        </>
    )
}

export default AnswerPoll