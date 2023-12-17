import React from 'react';
import { Col, Row, Progress, Input } from 'reactstrap';

const PollQuestion = ({ title, answersType, answers, poll_answers }) => {

    const checkAnswerCount = (answer_title) => {
        let sum = 0
        poll_answers.forEach((answerObj) => {
            answerObj.answers.forEach((answer) => {
                if (typeof answer.value === 'object' && answer.value !== null) {
                    if (Object.keys(answer.value).includes('title')) {
                        if (answer.value.title === answer_title)
                            sum++;
                    } else {
                        Object.values(answer.value).forEach((value) => {
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

    const checkAnswerCountString = () => {
        let sum = 0
        poll_answers.forEach((answerObj) => {
            answerObj.answers.forEach((answer) => {
                if(typeof answer.value === 'string' && answer.value !== null) {
                    sum++;
                }
            })
        })
        return sum;
    }


    return (
        <Row>
            <Col xs={12} className='d-flex flex-column'>
                <div style={{
                    overflow: 'hidden',
                    wordWrap: 'break-word'
                }}>
                    <h5>{title}</h5>
                </div>
            </Col>
            <Col xs={12} className='mt-3'>
                {answers
                    ?
                    <>
                        {answers.map(answer => (
                            <Row className='p-0' key={answer.title}>
                                <Col className='d-flex gap-2'>
                                    <Input disabled type={answersType} className='border-dark' />
                                    <div>
                                        {answer.title}
                                    </div>
                                </Col>
                                <Col>
                                    <Progress
                                        className="my-2"
                                        value={Number(checkAnswerCount(answer.title) / poll_answers.length * 100)}
                                        color="success">
                                        {Number(checkAnswerCount(answer.title) / poll_answers.length * 100).toFixed(0)}%
                                    </Progress>
                                </Col>
                            </Row>
                        ))}
                    </>
                    :
                    <>
                        {/* <ul className='text-answers'>
                            {poll_answers.map(answerObj =>
                                answerObj.answers.map(text_answer => (
                                    typeof text_answer.value === 'string' && <li key={text_answer.value}>{text_answer.value}</li>))
                            )}
                        </ul> */}
                        <Progress
                            className="my-2"
                            value={Number(checkAnswerCountString() / poll_answers.length * 100)}
                            color="success">
                            {Number(checkAnswerCountString() / poll_answers.length * 100).toFixed(0)}%
                        </Progress>
                        {/* {poll_answers.length} */}
                    </>
                }

            </Col>
        </Row>
    )
}

export default PollQuestion;