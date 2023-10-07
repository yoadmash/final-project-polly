import './CreatePoll.css';
import { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { useFormContext } from 'react-hook-form';
import Question from './Question';

const QuestionsAdder = () => {
    const { setValue, getValues, clearErrors } = useFormContext();

    const [questionsComponents, setQuestionsComponents] = useState([]);
    const [questionsCounter, setQuestionCounter] = useState(0);

    const addComponent = () => {
        setQuestionsComponents(prev => [...prev, <Question key={questionsCounter} id={questionsCounter} />]);
        setQuestionCounter(prev => prev + 1);
    }

    const deleteComponent = (key) => {
        setQuestionsComponents(prev => prev.filter(component => component.key !== key));
        const updatedQuestions = getValues().questions.splice(key, 0);
        setValue(`questions`, updatedQuestions);
    };

    useEffect(() => {
        if(questionsComponents.length > 0) {
            clearErrors('questionsLength');
        }
    }, [questionsComponents.length, clearErrors]);

    return (
        <div className='questions'>
            {questionsComponents.length > 0 && questionsComponents.map(questionComponent => (
                <Row key={questionComponent.key} className='new-question'>
                    <Col xs={12} md={11}>{questionComponent}</Col>
                    <Col xs={12} md={1} className='delete-question-btn'>
                        <button onClick={() => deleteComponent(questionComponent.key)} type='button'>
                            <img src='/assets/images/remove_question.svg' alt='delete_question' />
                        </button>
                    </Col>
                </Row>
            ))}
            {questionsComponents.length === 0
                ?
                <div className='add-first-question'>
                    <button onClick={addComponent} type='button'>Add First Question</button>
                </div>
                :
                <div className='add-question'>
                    <button onClick={addComponent} type='button'>
                        <img src='/assets/images/add_question.svg' alt='add-question' />
                    </button>
                    <p>Add Question</p>
                </div>
            }
        </div>
    )
}

export default QuestionsAdder;