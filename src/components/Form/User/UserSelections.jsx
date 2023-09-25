import React from 'react';
import { Row, Col, Input } from 'reactstrap'; // You can import the required components from your UI library

function SurveyComponent({ questions, shuffleQuestionsOrder, submitAnonymously }) {
    // Shuffle the questions if needed
    const shuffledQuestions = shuffleQuestionsOrder ? [...questions].sort(() => Math.random() - 0.5) : questions;

    return (
        <div>
            {shuffledQuestions.map((questionObj, index) => (
                <div key={index} style={{ borderRadius: '10px', marginBottom: '10px', backgroundColor: 'white', padding: '15px' }}>
                    <Row>
                        <h5>{questionObj.question}</h5>
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                        {questionObj.answers.map((answer, answerIndex) => (
                            <Row key={answerIndex} style={{ margin: 0, padding: 1 }} >
                                {questionObj.questionType === 'Text' && (
                                    <Col xs={12} sm={12} md={12} style={{ padding: 15 }} >
                                        <h6>Write Your Answer:</h6>
                                        <Input type='text' />
                                    </Col>
                                )}

                                {questionObj.questionType === 'Multiple Choices' && (
                                    <Col xs={2} sm={1} md={1} style={{}}>
                                        <Input type='checkbox' />
                                    </Col>
                                )}
                                {questionObj.questionType === 'One Choice' && (
                                    <Col xs={2} sm={1} md={1} >
                                        <Input type='radio' name={`question_${index}`} />
                                    </Col>


                                )}
                                <Col xs={10} sm={11} md={11} >
                                    <p style={{ margin: '0' }}>{answer}</p>
                                </Col>
                            </Row>
                        ))}
                    </Row>
                </div>
            ))
            }
        </div >
    );
}

export default SurveyComponent;
