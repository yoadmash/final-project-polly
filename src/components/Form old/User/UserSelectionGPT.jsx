import React from 'react';
import { Row, Col, Input } from 'reactstrap'; // You can import the required components from your UI library

function SurveyComponent({ questions, shuffleQuestionsOrder, submitAnonymously }) {
    // Shuffle the questions if needed
    const shuffledQuestions = shuffleQuestionsOrder ? [...questions].sort(() => Math.random() - 0.5) : questions;

    return (
        <div style={{ marginLeft: '-5px', paddingLeft: '0' }}>
            {shuffledQuestions.map((questionObj, index) => (
                <div key={index} style={{ borderRadius: '10px 10px 10px 10px', marginBottom: '20px', backgroundColor: 'white', padding: '15px 0px 10px 30px' }}>
                    <Row >
                        <h4>{questionObj.question}</h4>
                    </Row>
                    <Row>
                        {questionObj.answers.map((answer, answerIndex) => (
                            <Row key={answerIndex}>
                                <Col sm={2} md={2}>
                                    <Input type='checkbox' />
                                </Col>
                                <Col sm={10} md={10}>
                                    <p style={{ margin: '0' }}>{answer}</p>
                                </Col>
                            </Row>
                        ))}
                    </Row>
                </div>
            ))}
        </div>
    );
}

export default SurveyComponent;
