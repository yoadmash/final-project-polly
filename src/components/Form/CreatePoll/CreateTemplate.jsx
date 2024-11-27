import './CreatePoll.css';
import { useState } from 'react';
import { useForm, FormProvider, } from 'react-hook-form';
import { Row, Col, FormGroup, Container, Button, Form, Spinner } from 'reactstrap';
import GoBackLink from '../../Layout/GoBackLink';
import QuestionsAdder from './QuestionsAdder';
import UseFormInput from '../UseFormInput';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ErrMsg from '../../Layout/ErrMsg';
import useAuth from '../../../hooks/useAuth';

const CreateTemplate = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { id } = useParams();
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    let methods = useForm({
        defaultValues: (!id && !location?.pathname?.includes('edit')) ? {
            title: '',
            settings: {
                askUsersForTheirEmail: false,
                submitAnonymously: false,
                shuffleQuestionsOrder: false,
            }
        } : async () => {
            if(auth.admin) {
                try {
                    const response = await axiosPrivate.get(`polls/templates/${id}`);
                    if (response?.data?.template) {
                        return {
                            title: response.data.template.title,
                            questions: response.data.template.fields.questions,
                            settings: response.data.template.fields.settings
                        }
                    }
                } catch (err) {
                    navigate('../template-not-found');
                }
            } else {
                navigate('/');
            }
        },
    })
    const errors = methods.formState.errors;

    const handleSavePoll = async (data) => {
        setIsLoading(true);
        const templateObj = { title: data.title, fields: { questions: data.questions, settings: data.settings }, show: false }
        if (!id && !location?.pathname?.includes('edit')) {
            const created = await handleFormCreate(templateObj);
            if (created) {
                navigate(`/admin?tab=templates`);
            }
        } else {
            const editted = await handleFormEdit(templateObj);
            if (editted) {
                navigate(`/admin?tab=templates`);
            }
        }
        setIsLoading(false);
    }

    const handleFormCreate = async (data) => {
        try {
            await axiosPrivate.post('/polls/templates/create', { data });
            return true;
        } catch (err) {
            showError(err?.response?.data?.message);
            return false;
        }
    }

    const handleFormEdit = async (data) => {
        try {
            await axiosPrivate.post(`/polls/templates/${id}/edit`, { data });
            return true;
        } catch (err) {
            showError(err?.response?.data?.message);
            return false;
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
            <Form className='template-form' onSubmit={methods.handleSubmit(data => handleSavePoll(data))}>
                <GoBackLink to={-1} />
                <Container fluid={'md'} className='layout'>
                    <Row className='header'>
                        <Col xs={12} sm={8} className='p-0'>
                            <UseFormInput
                                type='text'
                                name={'title'}
                                placeholder='Title'
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
                        </Col>
                    </Row>
                    <Row>
                        <Container className='settings'>
                            <Row>
                                <Col sm={12} lg={4} className='d-flex align-items-center'>
                                    <div className="d-flex justify-content-between align-items-center w-100">
                                        <span>Ask users for their email</span>
                                        <FormGroup switch className='p-0 m-0'>
                                            <UseFormInput
                                                type='switch'
                                                role='switch'
                                                name={'settings.askUsersForTheirEmail'}
                                                register={methods.register}
                                            />
                                        </FormGroup>
                                    </div>
                                </Col>
                                <Col sm={12} lg={3} className='d-flex align-items-center'>
                                    <div className="d-flex justify-content-between align-items-center w-100">
                                        <span>Submit anonymously</span>
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
                                <Col sm={12} lg={3} className='d-flex align-items-center'>
                                    <div className="d-flex justify-content-between align-items-center w-100">
                                        <span>Shuffle questions</span>
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
                                <Col sm={12} lg={2}>
                                    <div className="">
                                        <Button color='success' className='d-flex justify-content-center align-items-center w-100' type={'submit'} disabled={isLoading}>
                                            {!isLoading
                                                ? (!id && !location.pathname?.includes('edit'))
                                                    ? 'Create Template'
                                                    : 'Save'
                                                : <Spinner size={'sm'} />}
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        {errMsg && <ErrMsg msg={errMsg} />}
                    </Row>
                    <Row className='d-flex flex-row'>
                        <QuestionsAdder />
                    </Row>
                </Container>
            </Form>
        </FormProvider>
    )
}

export default CreateTemplate