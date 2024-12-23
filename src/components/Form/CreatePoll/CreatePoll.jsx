import './CreatePoll.css';
import { useEffect, useState } from 'react';
import { useForm, FormProvider, } from 'react-hook-form';
import { Row, Col, FormGroup, Container, Button, Form, Spinner } from 'reactstrap';
import GoBackLink from '../../Layout/GoBackLink';
import PollImage from './PollImage';
import QuestionsAdder from './QuestionsAdder';
import UseFormInput from '../UseFormInput';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ErrMsg from '../../Layout/ErrMsg';
import useAuth from '../../../hooks/useAuth';
import { toast, Slide } from 'react-toastify';

const CreatePoll = () => {
    const [searchParams] = useSearchParams();
    const searchParamsObj = Object.fromEntries(searchParams);

    const navigate = useNavigate();
    const location = useLocation();

    const { id } = useParams();
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [editAllowed] = useState(auth.polls_created.includes(id));
    const [isLoading, setIsLoading] = useState(false);
    const [pollImgFile, setPollImgFile] = useState('');
    const [oldImage, setOldImage] = useState('');
    const [deletePollImageOnEdit, setDeletePollImageOnEdit] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    let methods = useForm({
        defaultValues: (!id && !location?.pathname?.includes('edit') && !searchParamsObj?.template) ? {
            title: '',
            description: '',
            user_email: '',
            image_path: pollImgFile,
            settings: {
                askUsersForTheirEmail: false,
                submitAnonymously: false,
                shuffleQuestionsOrder: false,
            }
        } : async () => {
            if (!searchParamsObj?.template) {
                if (editAllowed || auth.admin) {
                    try {
                        const response = await axiosPrivate.get(`/polls/${id}/`);
                        if (response.data.foundPoll) {
                            setOldImage(response.data.foundPoll.image_uuid || '');
                            return {
                                title: response.data.foundPoll.title,
                                description: response.data.foundPoll.description,
                                image_path: response.data.foundPoll.image_path,
                                questions: response.data.foundPoll.questions,
                                settings: response.data.foundPoll.settings,
                            }
                        }
                    } catch {
                        navigate('../poll-not-found');
                    }
                } else {
                    navigate('/');
                }
            } else {
                try {
                    const response = await axiosPrivate.get(`/polls/templates/${searchParamsObj?.template}`);
                    const fields = response.data.template.fields;
                    return {
                        title: response.data.template.title,
                        questions: fields.questions,
                        settings: fields.settings,
                    }
                } catch {
                    navigate('../template-not-found');
                }
            }
        },
    })
    const errors = methods.formState.errors;

    const handleSavePoll = async (data) => {
        setIsLoading(true);
        if (!id && !location?.pathname?.includes('edit')) {
            const poll_id = await handleFormCreate(data);
            if (poll_id) {
                navigate(`/poll/${poll_id}`);
            }
        } else {
            const editted = await handleFormEdit(data);
            if (editted) {
                navigate(searchParamsObj.by_admin ? '/admin?tab=polls' : '/');
            }
        }
        setIsLoading(false);
    }

    const handleFormCreate = async (data) => {
        const createPollData = new FormData();
        createPollData.append('poll_img', pollImgFile);
        createPollData.append('form_data', JSON.stringify(data));
        try {
            const response = await axiosPrivate.post('/polls/create', createPollData);
            toast.success('Poll created', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                theme: "light",
                transition: Slide,
            })
            return response.data.poll._id;
        } catch (err) {
            showError(err?.response?.data?.message);
            return null;
        }
    }

    const handleFormEdit = async (data) => {
        const editPollData = new FormData();
        editPollData.append('poll_img', pollImgFile);
        editPollData.append('form_data', JSON.stringify(data));
        editPollData.append('delete_image', JSON.stringify(deletePollImageOnEdit));
        editPollData.append('old_image', oldImage);
        try {
            await axiosPrivate.post(`/polls/${id}/edit`, editPollData);
            toast.success('Poll saved', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                theme: "light",
                transition: Slide,
            })
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
            <Form className='create-poll' onSubmit={methods.handleSubmit(data => handleSavePoll(data))}>
                <GoBackLink />
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
                            <UseFormInput
                                type='text'
                                name={'description'}
                                placeholder='Description'
                                register={methods.register}
                            />
                        </Col>
                        <Col xs={12} sm={4} className='p-0'>
                            <PollImage setPollImgFile={setPollImgFile} setDeletePollImageOnEdit={setDeletePollImageOnEdit} editMode={(id && location?.pathname?.includes('edit'))} />
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
                                                    ? 'Create'
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

export default CreatePoll