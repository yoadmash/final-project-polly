import React, { useState } from 'react';
import { Row, Col, FormGroup, Input } from 'reactstrap';
import DropDownOptions from './DropDownFunc';
import './CSS/AdminForm.css';
// import FormInputs from './FormInputs';

import FormComponent from './AddInput';

export default function QuestionSection() {
    const [optionType, setOptionType] = useState('radio');

    const typeSelected = (type) => {
        setOptionType(type);
    }



    return (

        <Row className="form_questions">
            {/**************** Question inputs ****************/}
            <Col className='col-8'>
                <div className='question_div'>
                    <Row>
                        <input className="question_input" type="text" name="question" placeholder="Question..." id="" /></Row>
                    <Row className='inputs-row'>
                        {/* Function that adds an option and change the option type according to the dropdown list:*/}
                        {/* <FormComponent /> */}
                        <FormComponent selectedOption={optionType} />
                    </Row>
                </div>
            </Col>

            {/************ Question option ************/}
            <Col>
                <Row>  <h6 className='text-center' style={{ fontWeight: 600, paddingTop: 10 }}>Question Options</h6></Row>
                <Row>
                    <DropDownOptions typeSelected={setOptionType} />
                </Row>
                <Row className=''>
                    <Col className=' col-9'>
                        <p style={{ margin: '0' }}>Required Question</p>
                    </Col>
                    <Col className='col-3'>
                        <FormGroup switch>
                            <Input type="switch" role="switch" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className=''>
                    <Col className='col-9'>
                        <p style={{ margin: '0' }}>Shuffle Order</p>
                    </Col>
                    <Col className='col-3'>
                        <FormGroup switch>
                            <Input type="switch" role="switch" />
                        </FormGroup>                  </Col>
                </Row>

            </Col>
        </Row>

    )
}