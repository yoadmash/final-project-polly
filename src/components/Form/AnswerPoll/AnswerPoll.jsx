import './AnswerPoll.css';
import { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button, Spinner } from 'reactstrap';
import { useNavigate, useParams } from "react-router-dom";
import { useForm, FormProvider, } from 'react-hook-form';
import GoBackLink from '../../Layout/GoBackLink';
import useAuth from '../../../hooks/useAuth';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Loading from '../../Layout/Loading';
import Questions from './Questions';
import ErrMsg from '../../Layout/ErrMsg';

const AnswerPoll = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [poll, setPoll] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const methods = useForm({
        defaultValues: {
            answered_by: {
                user_id: auth.userId,
                user_name: auth.username,
            },
        },
    })

    const checkIfPollExist = async () => {
        try {
            const response = await axiosPrivate.get(`/polls/${id}`);
            setPoll(response.data.foundPoll);
            if (response.data.foundPoll.owner.id !== auth.userId) {
                await checkIfPollAnswered(response.data.foundPoll);
                await visitPoll();
            }
            setIsLoading(false);
        } catch (err) {
            navigate('/poll-not-found');
        }
    }

    const visitPoll = async () => {
        try {
            await axiosPrivate.post(`/polls/visit`, { id });
        } catch (err) {
            console.log(err);
        }
    }

    const checkIfPollAnswered = async (poll) => {
        try {
            const response = await axiosPrivate.get(`polls/${id}/get_poll_answers`);
            if (response.data?.userAnswers) {
                navigate(`/poll/${id}/view_answers`, {
                    state: {
                        poll,
                        userAnswers: response.data.userAnswers
                    },
                    replace: true
                });
            }
        } catch (err) {
            console.log(err.response.data.message);
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
            await axiosPrivate.post('/polls/answer_poll', { pollId: id, data });
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
                                    <img src={process.env.REACT_APP_API_URL + poll.image_path} alt="poll_image" />
                                </Col>}
                            </Row>
                            <Questions questions={poll.questions} shuffle={poll.settings.shuffleQuestionsOrder} isOwner={poll.owner.id === auth.userId} />
                            <Row>
                                <Button
                                    color='success'
                                    disabled={poll.owner.id === auth.userId}
                                >
                                    {!submitting
                                        ?
                                        poll.owner.id !== auth.userId
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