import React, { useState } from 'react';
import { Row, Col, FormGroup, Input } from 'reactstrap';
import DropDownOptions from './DropDownFunc';
import './CSS/AdminForm.css';
import FormComponent from './AddInput';

export default function QuestionSection() {
  const [optionType, setOptionType] = useState('radio');

  const typeSelected = (type) => {
    setOptionType(type);
  }

  return (
    <Row className="form-questions" style={{ padding: '20px' }}>
      <Col sm={12} md={12} lg={8}>
        <Row style={{ paddingBottom: '15px' }}>
          <input className="question-title" type="text" name="question" placeholder="Question..." />
        </Row>
        <Row className='inputs-row'>
          <FormComponent selectedOption={optionType} />
        </Row>
      </Col>
      <Col sm={12} md={12} lg={4} >
        <Row> <h6 style={{ textAlign: 'center', fontWeight: 600 }}>Question Options</h6></Row>
        <Row><DropDownOptions typeSelected={typeSelected} /></Row>
        <Row>
          <Col sm={10} md={10} >
            <p style={{ margin: '0' }}>Required Question</p>
          </Col>
          <Col sm={2} md={2}>
            <FormGroup switch>
              <Input type="switch" role="switch" />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={10} md={10}>
            <p style={{ margin: '0' }}>Shuffle Order</p>
          </Col>
          <Col sm={2} md={2}>
            <FormGroup switch>
              <Input type="switch" role="switch" />
            </FormGroup>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
