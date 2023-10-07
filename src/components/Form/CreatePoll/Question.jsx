import { useEffect, useState } from 'react';
import { Row, Col, Input, FormGroup } from 'reactstrap';
import { useFormContext } from 'react-hook-form';
import UseFormInput from './UseFormInput';
import TypeDropDown from './TypeDropDown';
import AnswersAdder from './AnswersAdder';

const Question = ({ id }) => {

    const { register, setValue, getValues, formState: { errors } } = useFormContext();

    const [answersType, setAnswersType] = useState('text');

    // const handleTitleChange = (title) => {
    // }

    // const handleSettingsChange = (setting, status) => {
    // }

    useEffect(() => {
        setValue(`questions[${id}]`, {
            title: (getValues()?.questions?.[id]?.title ? getValues()?.questions?.[id]?.title : ''),
            answers: getValues()?.questions?.[id]?.answers && answersType !== 'text' ? getValues()?.questions?.[id]?.answers : [],
            answersType: answersType,
            settings: getValues()?.questions?.[id]?.settings ? getValues()?.questions?.[id]?.settings : {
                required: false,
                shuffleAnswerOrder: false
            }
        });
    }, [setValue, getValues, id, answersType]);

    return (
        <Row className='question'>
            {console.log(id)}
            <Col sm={12} md={8} lg={9} className='question-content'>
                <Row className='mb-3'>
                    {/* <Input
                        type='text'
                        placeholder='Question title...'
                        onChange={(event) => handleTitleChange(event.target.value)}
                    /> */}
                    <UseFormInput
                        type='text'
                        placeholder='Question title...'
                        name={`questions[${id}].title`}
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
                        register={register}
                    />
                    {errors?.questions?.[id]?.title && <p className="validation-msg ms-1 mt-1">{errors?.questions[id]?.title?.message}</p>}
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
                                {/* <Input type="switch" role="switch"
                                    onChange={(e) => { handleSettingsChange('required', e.target.checked) }}
                                /> */}
                                <UseFormInput
                                    type='switch'
                                    role='switch'
                                    name={`questions[${id}].settings.required`}
                                    register={register}
                                />
                            </FormGroup>
                        </div>
                    </Col>
                    <Col className='d-flex justify-content-center align-items-center' xs={12} sm={12} md={12} lg={12}>
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <span>Shuffle</span>
                            <FormGroup switch className='p-0 m-0'>
                                {/* <Input type="switch" role="switch"
                                    onChange={(e) => { handleSettingsChange('shuffleAnswerOrder', e.target.checked) }}
                                /> */}
                                <UseFormInput
                                    type='switch'
                                    role='switch'
                                    name={`questions[${id}].settings.shuffleAnswerOrder`}
                                    register={register}
                                />
                            </FormGroup>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Question;