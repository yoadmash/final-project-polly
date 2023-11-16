import { useEffect, useState } from 'react';
import { Row, Col, Input, FormGroup } from 'reactstrap';
import TypeDropDown from './TypeDropDown';
import AnswersAdder from './AnswersAdder';
import { useFormContext } from 'react-hook-form';
import UseFormInput from '../UseFormInput';

const Question = ({ id }) => {

    const [answersType, setAnswersType] = useState('text');
    const { register, formState: { errors }, setValue } = useFormContext();

    useEffect(() => {
        setValue(`questions.${id}.answersType`, answersType);
        setValue(`questions.${id}.original_index`, id);
    }, [answersType, setValue, id]);

    return (
        <Row className='question'>
            <Col sm={12} md={8} lg={9} className='question-content'>
                <Row className='mb-3'>
                    <UseFormInput
                        type='text'
                        name={`questions.${id}.title`}
                        placeholder='Question title...'
                        register={register}
                        validation={{
                            required: {
                                value: true,
                                message: '* Required field',
                            },
                            minLength: {
                                value: 8,
                                message: '* Must include atleast 8 characters',
                            }
                        }}
                    />
                    {errors?.questions?.[id]?.title && <p className='validation-msg ms-1 mt-1'>{errors.questions[id].title.message}</p>}
                </Row>
                <Row className='question-answers'>
                    {answersType === 'text'
                        ?
                        <Input
                            readOnly
                            type={answersType || 'text'}
                            name='text-answer'
                            placeholder={answersType === 'text' ? 'The user answer will be eneterd here...' : ''}
                            style={{ opacity: 0.5, backgroundColor: '#f1f1f1', height: "50px" }}
                        />
                        :
                        <AnswersAdder type={answersType} questionId={id} />
                    }
                </Row>
            </Col>
            <Col sm={12} md={4} lg={3} className='question-settings'>
                <Row className='mb-3'>
                    <TypeDropDown setAnswersType={setAnswersType} questionId={id} />
                </Row>
                <Row>
                    <Col className='d-flex justify-content-center align-items-center' xs={12} sm={12} md={12} lg={12}>
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <span>Required</span>
                            <FormGroup switch className='p-0 m-0'>
                                <UseFormInput
                                    type="switch"
                                    role="switch"
                                    name={`questions.${id}.settings.required`}
                                    register={register}
                                />
                            </FormGroup>
                        </div>
                    </Col>
                    {answersType !== 'text' && <Col className='d-flex justify-content-center align-items-center' xs={12} sm={12} md={12} lg={12}>
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <span>Shuffle</span>
                            <FormGroup switch className='p-0 m-0'>
                                <UseFormInput
                                    type="switch"
                                    role="switch"
                                    name={`questions.${id}.settings.shuffleAnswers`}
                                    register={register}
                                />
                            </FormGroup>
                        </div>
                    </Col>}
                </Row>
            </Col>
        </Row>
    )
}

export default Question;