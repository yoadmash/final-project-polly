import React from 'react';
import { Row, Col, Input, Progress } from 'reactstrap';

function SurveyExport({ questionsData, receivedCountAnswers }) {
    if (!questionsData || !Array.isArray(questionsData)) {
        return null;
    }

    return (
        <div>
            {questionsData.map((questionObj, index) => {
                const totalAnswersForQuestion = receivedCountAnswers
                    .filter(({ questionIndex }) => questionIndex === index) // Filter by questionIndex
                    .reduce((acc, { count }) => acc + count, 0); // Calculate the total count of answers for this question

                const percentage = (totalAnswersForQuestion / 10) * 100; // Calculate the percentage

                return (
                    <div key={index} style={{ borderRadius: '10px 10px 10px 10px', marginBottom: '10px', backgroundColor: 'white', padding: '15px 0px 10px 30px' }}>
                        <Row>
                            <h5>{questionObj.questionHeader}</h5>
                        </Row>
                        <Row>
                            {questionObj.type === 'text' ? (
                                <Col xs={12} sm={12} md={12}>
                                    <p style={{ margin: '0' }}>{questionObj.answer}</p>
                                </Col>
                            ) : (
                                questionObj.answers.map((answer, answerIndex) => (
                                    <Row key={answerIndex}>
                                        <Col xs={2} sm={1} md={1}>
                                            <Input type='checkbox' disabled={questionObj.chosenAnswer.includes(answerIndex + 1)} checked={questionObj.chosenAnswer.includes(answerIndex + 1)} />
                                        </Col>
                                        <Col xs={10} sm={11} md={5}>
                                            <p style={{ margin: '0' }}>{answer}</p>
                                        </Col>
                                        <Col md={6}>
                                            <Progress value={percentage}>{`${percentage.toFixed(2)}%`}</Progress>
                                        </Col>
                                    </Row>
                                ))
                            )}
                        </Row>
                    </div>
                );
            })}
        </div>
    );
}

export default SurveyExport;