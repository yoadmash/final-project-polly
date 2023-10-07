import './CreatePoll.css';
import { Row, Col, FormGroup, Container, Button, Form } from 'reactstrap';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import UseFormInput from './UseFormInput';
import GoBackLink from '../../Layout/GoBackLink';
import PollImage from './PollImage';
import QuestionsAdder from './QuestionsAdder';

const CreatePoll = () => {
    const { setValue, register, handleSubmit, formState: { errors }, setError, reset } = useFormContext();

    const handleSavePoll = async (data) => {
        if (data.questions.length === 0) {
            setError('questionsLength', { type: 'custom', message: '* Please add atleast 1 question' });
            return;
        }
        console.log(data);
    }

    useEffect(() => {
        setValue('description', '');
        setValue('questions', []);
    }, [setValue]);

    useEffect(() => {
        return () => {
            reset();
        }
    }, [reset]);

    return (
        <Form className='create-poll' onSubmit={handleSubmit((data) => handleSavePoll(data))}>
            <GoBackLink />
            <Container fluid={'md'} className='layout'>
                <Row className='header'>
                    <Col xs={12} sm={8}>
                        <UseFormInput
                            type='text'
                            name={'title'}
                            register={register}
                            validation={{
                                required: {
                                    value: true,
                                    message: '* Required field'
                                },
                                minLength: {
                                    value: 8,
                                    message: 'Must include atleast 8 characters'
                                }
                            }}
                            placeholder='Untitled Poll'
                        />
                        {errors?.title && <p className="validation-msg">{errors?.title?.message}</p>}
                        <UseFormInput
                            type='text'
                            name={'description'}
                            register={register}
                            placeholder='Description'
                        />
                    </Col>
                    <Col xs={12} sm={4}>
                        <PollImage />
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
                                            register={register}
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
                                            register={register}
                                        />
                                    </FormGroup>
                                </div>
                            </Col>
                            <Col md={12} lg={4} className='d-flex align-items-center'>
                                <div className="d-flex justify-content-center align-items-center w-100 gap-2">
                                    <Button color='success' className='w-100' type={'submit'}>Save</Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Row>
                <Row>
                    <QuestionsAdder />
                    {errors?.questionsLength && <p className="validation-msg text-center">{errors?.questionsLength?.message}</p>}
                </Row>
            </Container>
        </Form>
    )
}

export default CreatePoll