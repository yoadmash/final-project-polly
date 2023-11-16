import './CreatePoll.css';
import { useState } from 'react';
import { useForm, FormProvider, } from 'react-hook-form';
import { Row, Col, FormGroup, Container, Button, Form, Spinner } from 'reactstrap';
import GoBackLink from '../../Layout/GoBackLink';
import PollImage from './PollImage';
import QuestionsAdder from './QuestionsAdder';
import UseFormInput from '../UseFormInput';
import useAuth from '../../../hooks/useAuth';
import axios from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import ErrMsg from '../../Layout/ErrMsg';

const CreatePoll = () => {

    const navigate = useNavigate();
    const { auth } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [pollImgFile, setPollImgFile] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const methods = useForm({
        defaultValues: {
            title: '',
            description: '',
            image_path: pollImgFile,
            settings: {
                shuffleQuestionsOrder: false,
                submitAnonymously: false
            }
        },
    })
    const errors = methods.formState.errors;

    const handleSavePoll = async (data) => {
        setIsLoading(true);
        const poll_id = await handleFormSubmit(data);
        if(poll_id) {
            navigate(`/poll/${poll_id}`);
        }
        setIsLoading(false);
    }

    const handleFormSubmit = async (data) => {
        const formData = new FormData();
        formData.append('poll_img', pollImgFile);
        formData.append('form_data', JSON.stringify(data));
        try {
            const response = await axios.post('/polls/create', formData, {
                headers: {
                    Authorization: `Bearer ${auth.accessToken}`
                },
                withCredentials: true
            });
            return response.data.poll._id;
        } catch (err) {
            showError(err?.response?.data?.message);
            return null;
        }
    }

    const showError = (err_msg) => {
        setErrMsg(err_msg);
        setIsLoading(false);
        setTimeout(() => {
            setErrMsg('');
        }, 3000);
    }

    return (
        <FormProvider {...methods}>
            <Form className='create-poll' onSubmit={methods.handleSubmit(data => handleSavePoll(data))}>
                <GoBackLink />
                <Container fluid={'md'} className='layout'>
                    <Row className='header'>
                        <Col xs={12} sm={8}>
                            <UseFormInput
                                type='text'
                                name={'title'}
                                placeholder='Untitled Poll'
                                register={methods.register}
                                validation={{
                                    required: {
                                        value: true,
                                        message: '* Required field'
                                    },
                                    minLength: {
                                        value: 8,
                                        message: '* Must include atleast 8 charaters'
                                    }
                                }}
                            />
                            {errors?.title?.message && <p className='validation-msg'>{errors.title.message}</p>}
                            <UseFormInput
                                type='text'
                                name={'description'}
                                placeholder='Description'
                                register={methods.register}
                            />
                        </Col>
                        <Col xs={12} sm={4}>
                            <PollImage setPollImgFile={setPollImgFile} />
                        </Col>
                    </Row>
                    <Row>
                        <Container className='settings'>
                            <Row>
                                <Col md={12} lg={4} className='d-flex align-items-center'>
                                    <div className="d-flex justify-content-between align-items-center w-100">
                                        <span>Shuffle Questions Order</span>
                                        <FormGroup switch className='p-0 m-0'>
                                            <UseFormInput
                                                type='switch'
                                                role='switch'
                                                name={'settings.shuffleQuestionsOrder'}
                                                register={methods.register}
                                            />
                                        </FormGroup>
                                    </div>
                                </Col>
                                <Col md={12} lg={4} className='d-flex align-items-center'>
                                    <div className="d-flex justify-content-between align-items-center w-100">
                                        <span>Submit Anonymously</span>
                                        <FormGroup switch className='p-0 m-0'>
                                            <UseFormInput
                                                type='switch'
                                                role='switch'
                                                name={'settings.submitAnonymously'}
                                                register={methods.register}
                                            />
                                        </FormGroup>
                                    </div>
                                </Col>
                                <Col md={12} lg={4} className='d-flex align-items-center'>
                                    <div className="d-flex justify-content-center align-items-center w-100 gap-2">
                                        <Button color='success' className='w-100' type={'submit'} disabled={isLoading}>
                                            {!isLoading ? 'Save' : <Spinner size={'sm'} />}
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        {errMsg && <ErrMsg msg={errMsg} />}
                    </Row>
                    <Row>
                        <QuestionsAdder />
                    </Row>
                </Container>
            </Form>
        </FormProvider>
    )
}

export default CreatePoll