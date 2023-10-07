import { useEffect, useState } from 'react'
import { Input, Row, Col, Button } from 'reactstrap';
import { useFormContext } from 'react-hook-form';
import Answer from './Answer';

const AnswersAdder = ({ type, questionId }) => {

    const { setValue, getValues, setError, clearErrors, formState: { errors } } = useFormContext();

    const [answersComponents, setAnswerComponents] = useState([]);

    const addComponent = (text) => {
        const key = answersComponents.length;
        setAnswerComponents(prev => [...prev, { key: key, ids: { answer: key, question: questionId }, text: text }]);
    }

    const deleteComponent = (key, text) => {
        const updatedAnswers = getValues().questions[questionId].answers.filter(answer => answer !== text);
        setValue(`questions[${questionId}].answers`, updatedAnswers);
        setAnswerComponents(prev => prev.filter(component => component.key !== key));
    };

    const handleAddAnswer = (e) => {
        if (e.key === 'Enter' && e.target.value.length > 0) {
            e.preventDefault();
            addComponent(e.target.value);
            e.target.value = '';
        }
    }

    useEffect(() => {
        if (type !== 'text') {
            const length = answersComponents.length;
            switch (type) {
                case 'radio': {
                    if (length < 2) {
                        setError(`q${questionId}_answersLength`, { type: 'custom', message: '* Please add atleats 2 answers' });
                    } else {
                        clearErrors(`q${questionId}_answersLength`);
                    }
                    break;
                }
                case 'checkbox': {
                    if (length < 3) {
                        setError(`q${questionId}_answersLength`, { type: 'custom', message: '* Please add atleats 3 answers' });
                    } else {
                        clearErrors(`q${questionId}_answersLength`);
                    }
                    break;
                }
                default:
                    clearErrors(`q${questionId}_answersLength`);
                    break;
            }
        }
    }, [type, answersComponents.length, setError, clearErrors, questionId]);

    useEffect(() => {
        return () => {
            clearErrors(`q${questionId}_answersLength`);
        }
    }, [clearErrors, questionId]);

    return (
        <div>
            {answersComponents.length > 0 && answersComponents.map(answersComponent => (
                <Row key={answersComponent.key} className='answer p-1 mb-1'>
                    <Col xs={10}>
                        <Answer key={answersComponent.key} ids={answersComponent.ids} type={type} text={answersComponent.text} />
                    </Col>
                    <Col xs={2} className='d-flex justify-content-end'>
                        <Button onClick={() => deleteComponent(answersComponent.key, answersComponent.text)} type='button'>x</Button>
                    </Col>
                </Row>
            ))}
            <div className="d-flex gap-3 align-items-center p-1">
                <Input type={type} name='answer-type' disabled />
                <Input type='text' name='add-new-answer' placeholder='Add Answer' className='w-50' onKeyDown={(e) => handleAddAnswer(e)} />
            </div>
            {errors[`q${questionId}_answersLength`] && <p className="validation-msg ms-5">{errors[`q${questionId}_answersLength`]?.message}</p>}
        </div>
    )
}

export default AnswersAdder