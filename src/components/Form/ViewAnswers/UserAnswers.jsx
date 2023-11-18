import React from 'react';
import { Row, Col, Input, Label } from 'reactstrap';
import './ViewAnswers.css';

const UserAnswers = ({ poll_questions, user_answers }) => {

    const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga vel quibusdam reprehenderit vitae, aspernatur, illo sapiente ut quae consequatur eum deserunt? Perspiciatis sed distinctio ipsa tenetur blanditiis nihil mollitia esse.'

    return (
        <>
            {poll_questions?.map((question, q_index) => (
                <Row key={q_index}>
                    <Col xs={12}>
                        <h5>{question.title}</h5>
                    </Col>
                    <Col xs={12} className='mt-3'>
                        {!question.answers
                            ?
                            <Input
                                type='textarea'
                                readOnly
                                defaultValue={user_answers[q_index]?.value}
                            />
                            :
                            <>
                                {
                                    question.answers.map((answer, a_index) => (
                                        <div key={a_index} className='d-flex gap-3'>
                                            <Input
                                                type={question.answersType}
                                                defaultChecked={
                                                    (question.answersType === 'radio')
                                                    ? user_answers[q_index]?.value?.original_index === a_index
                                                    : user_answers[q_index]?.value?.[a_index]?.original_index === a_index
                                                    // true
                                                }
                                                disabled
                                            />
                                            <Label>{answer.title}</Label>
                                        </div>
                                    ))
                                }
                            </>
                        }
                    </Col>
                </Row>
            ))}
        </>
    )
}

export default UserAnswers