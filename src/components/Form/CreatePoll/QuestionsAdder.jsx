import './CreatePoll.css';
import { Col, Row } from 'reactstrap';
import Question from './Question';
import { useFormContext, useFieldArray } from 'react-hook-form';

const QuestionsAdder = () => {

    const { formState: { errors } } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        rules: {
            required: {
                value: true,
                message: '* Please add atleast 1 question'
            }
        },
        name: 'questions'
    });

    const addQuestion = () => {
        append({
            title: '',
            settings: {
                required: false,
                shuffleAnswers: false
            },
        });
    }

    return (
        <div className='questions'>
            {fields.map((field, index) => (
                <Row key={field.id} className='new-question'>
                    <Col xs={12} md={11}><Question key={field.id} id={index} /></Col>
                    <Col xs={12} md={1} className='delete-question-btn'>
                        <button onClick={() => remove(index)} type='button'>
                            <img src='/assets/images/remove_question.svg' alt='delete_question' />
                        </button>
                    </Col>
                </Row>
            ))}
            {fields.length === 0
                ?
                <div className='add-first-question d-flex flex-column'>
                    <button
                        onClick={addQuestion}
                        type='button'>Add First Question
                    </button>
                    {errors?.questions?.root?.message && <p className='validation-msg mt-1'>{errors.questions.root.message}</p>}
                </div>
                :
                <div className='add-question'>
                    <button onClick={addQuestion} type='button'>
                        <img src='/assets/images/add_question.svg' alt='add-question' />
                    </button>
                    <p>Add Question</p>
                </div>
            }
        </div>
    )
}

export default QuestionsAdder;