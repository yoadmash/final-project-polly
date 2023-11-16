import { useEffect } from 'react'
import { Input, Row, Col, Button } from 'reactstrap';
import Answer from './Answer';
import { useFormContext, useFieldArray } from 'react-hook-form';

const AnswersAdder = ({ type, questionId }) => {

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

    const handleAddAnswer = (e) => {
        if (e.key === 'Enter' && e.target.value.length > 0) {
            e.preventDefault();
            append({
                title: e.target.value
            });
            e.target.value = '';
        }
    }

    return (
        <div>
            {fields.map((field, index) => (
                <Row key={field.id} className='answer p-1 mb-1'>
                    <Col xs={10}>
                        <Answer key={field.id} ids={{ answer: index, question: questionId }} type={type} text={field.title} />
                    </Col>
                    <Col xs={2} className='d-flex justify-content-end'>
                        <Button type='button' onClick={() => remove(index)}>x</Button>
                    </Col>
                </Row>
            ))}
            <div className="d-flex gap-3 align-items-center p-1">
                <Input type={type} name='answer-type' disabled />
                <Input autoComplete={'off'} type='text' name='answer-add-new' placeholder='Add Answer' className='w-50' onKeyDown={(e) => handleAddAnswer(e)} />
            </div>
            {errors?.questions?.[questionId]?.answers?.root?.message && <p className='validation-msg mt-1'>{errors.questions?.[questionId].answers.root.message}</p>}
        </div>
    )
}

export default AnswersAdder