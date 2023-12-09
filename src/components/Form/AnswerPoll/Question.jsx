import React from 'react';
import { Col, Row } from 'reactstrap';
import Answers from './Answers';

const Question = ({ question, q_index, settings, isOwner }) => {

    return (
        <Row>
            <Col xs={12}>
                <h5>{question.title}</h5>
            </Col>
            <Col xs={12} className='mt-3'>
                <Answers
                    answers={question.answers}
                    type={question.answersType}
                    q_index={q_index}
                    settings={settings}
                    isOwner={isOwner}
                />
            </Col>
        </Row>
    )
}

export default Question