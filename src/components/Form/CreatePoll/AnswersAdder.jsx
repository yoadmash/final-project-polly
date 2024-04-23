import { useEffect, useState } from 'react'
import { Input, Row, Col, Button } from 'reactstrap';
import Answer from './Answer';
import { useFormContext, useFieldArray } from 'react-hook-form';

const AnswersAdder = ({ type, questionId }) => {

    const [answerToAddText, setAnswerToAddText] = useState('');
    const answersToAdd = (type === 'text') ? 0 : (type === 'radio') ? 2 : 3;
    const { formState: { errors }, clearErrors } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        rules: {
            required: {
                value: true,
                message: `* Please add atleast ${answersToAdd} answers`
            },
            minLength: {
                value: answersToAdd,
                message: `* Please add atleast ${answersToAdd} answers`
            }
        },
        shouldUnregister: true,
        name: `questions.${questionId}.answers`
    });

    useEffect(() => {
        clearErrors(`questions.${questionId}.answers`);
    }, [clearErrors, type, questionId]);

    const handleAddAnswer = () => {
        if (answerToAddText.length > 0) {
            append({
                title: answerToAddText
            });
            setAnswerToAddText('');
        }
    }

    return (
        <div>
            {fields.map((field, index) => (
                <Row key={field.id} className='answer p-1 mb-1'>
                    <Answer key={field.id} ids={{ answer: index, question: questionId }} type={type} text={field.title} />
                    <Col xs={2} className='d-flex justify-content-end'>
                        <Button type='button' onClick={() => remove(index)}>x</Button>
                    </Col>
                </Row>
            ))}
            <Row className='answer-adder align-items-center p-1 mb-1'>
                <Col xs={10} className='d-flex align-items-center gap-2'>
                    <Input type={type} name='answer-type' disabled />
                    <Input
                        value={answerToAddText}
                        autoComplete={'off'}
                        type='text'
                        name='answer-add-new'
                        placeholder='Add Answer'
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddAnswer();
                            }
                        }}
                        onChange={(e) => setAnswerToAddText(e.target.value)}
                    />
                </Col>
                <Col xs={2} className='d-flex justify-content-end'>
                    <Button type='button' onClick={() => handleAddAnswer()}>+</Button>
                </Col>
            </Row>
            {errors?.questions?.[questionId]?.answers?.root?.message && <p className='validation-msg mt-1'>{errors.questions?.[questionId].answers.root.message}</p>}
        </div>
    )
}

export default AnswersAdder