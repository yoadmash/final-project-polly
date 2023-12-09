import React from 'react';
import { Row, Col, Input, Label } from 'reactstrap';
import './ViewAnswers.css';

const UserAnswers = ({ poll_questions, user_answers }) => {

    const defaultRows = (user_answers, index) => {
        const rows = user_answers[index]?.value.split(/\r\n|\r|\n/).length;
        if(rows === 1) {
            return 5;
        }
        return rows;
    }

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
                                rows={defaultRows(user_answers, q_index)} // matching rows count
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