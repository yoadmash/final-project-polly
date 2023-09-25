import React, { useState } from 'react';
import { Row, Col, FormGroup, Input } from 'reactstrap';
import DropDownOptions from './DropDownFunc';
import './CSS/AdminForm.css';
import FormComponent from './AddMultipleInputs';


export default function QuestionSection() {
  const [optionType, setOptionType] = useState('');

  const typeSelected = (type) => {
    setOptionType(type);
  }

  return (
    <Row className="form-questions">
      <Col sm={10} md={12} lg={8} >
        <Row style={{ paddingBottom: '15px' }} >
          <Input className="question-title" type="text" name="question" placeholder="Question title..." />
        </Row>

        {/************* This is where the inputs are rendered  ************/}
        <Row className='inputs-row' style={{ paddingBottom: "20px" }}>
          <FormComponent selectedOption={optionType} />
        </Row>

      </Col>
      <Col sm={12} md={12} lg={4} >
        <Row >
          <h6 style={{ textAlign: 'center', fontWeight: 600, paddingBottom: '15px' }}>Question Options</h6>
        </Row>

        {/******** Here we choose input type *********/}
        <Row style={{ paddingTop: '5%' }}>
          <DropDownOptions typeSelected={typeSelected} />
        </Row>
        <Row style={{ paddingTop: "5%" }}>
          <Col xs={10} sm={10} md={10} lg={9} >
            <p style={{ margin: '0' }}>Required?</p>
          </Col>
          <Col xs={2} sm={2} md={2} lg={2}>
            <FormGroup switch >
              <Input type="switch" role="switch" />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={10} sm={10} md={10} lg={9}>
            <p style={{ margin: '0' }}>Shuffle Order</p>
          </Col>
          <Col xs={2} sm={2} md={2} lg={2}>
            <FormGroup switch>
              <Input type="switch" role="switch" />
            </FormGroup>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
