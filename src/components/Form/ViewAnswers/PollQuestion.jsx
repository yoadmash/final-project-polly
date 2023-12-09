import React from 'react';
import { Col, Row, Progress } from 'reactstrap';

const PollQuestion = ({ title, answers, poll_answers }) => {

    const checkAnswerCount = (answer_title) => {
        let sum = 0
        poll_answers.forEach((answerObj, a_index) => {
            answerObj.answers.forEach((answer, v_index) => {
                if (typeof answer.value === 'object' && answer.value !== null) {
                    if (Object.keys(answer.value).includes('title')) {
                        if (answer.value.title === answer_title)
                            sum++;
                    } else {
                        Object.values(answer.value).forEach((value, v_index) => {
                            if (value.title === answer_title) {
                                sum++
                            }
                        });
                    }
                }
            })
        })
        return sum;
    }


    return (
        <Row>
            <Col xs={12}>
                <h5>{title}</h5>
            </Col>
            <Col xs={12} className='mt-3'>
                {answers
                    ?
                    <>
                        {answers.map(answer => (
                            <Row className='p-0' key={answer.title}>
                                <Col >{answer.title}</Col>
                                <Col>
                                    <Progress
                                        className="my-2"
                                        value={Number(checkAnswerCount(answer.title) / poll_answers.length * 100)}
                                        color="success">

                                        {Number(checkAnswerCount(answer.title) / poll_answers.length * 100).toFixed(2)}%
                                    </Progress>
                                </Col>
                            </Row>
                        ))}
                    </>
                    :
                    <>
                        <Row>
                            <div className='text-answers'>
                                {poll_answers.map(answerObj =>
                                    answerObj.answers.map(text_answer => (
                                        <>

                                            {typeof text_answer.value === 'string' && <li>{text_answer.value}</li>}
                                            {typeof text_answer.value === 'string' && <li>{text_answer.value}</li>}
                                            {typeof text_answer.value === 'string' && <li>{text_answer.value}</li>}
                                            {typeof text_answer.value === 'string' && <li>{text_answer.value}</li>}
                                            {typeof text_answer.value === 'string' && <li>{text_answer.value}</li>}

                                        </>
                                    ))
                                )}
                            </div>
                        </Row>
                    </>
                }

            </Col>
        </Row>
    )
}

export default PollQuestion;