import React, { useState } from "react";
import "./CSS/Form.css";
import { Row, Col, Input, FormGroup } from 'reactstrap';
import { Image_Upload_Function } from "./Image_uploading/Image_Uploading";
import QuestionSection from "./QuestionSection";
import ComponentAdder from "./Functions/AddQuestionFunction";


export default function FormPage() {
  return (
    <div>
      <div className='form_header '>
        <img className="form_logo" src="/Polly_logo.svg" alt="" />
      </div>
      <div className='form_Page'>
        <div className='form_layout'>
          <Row>

            {/***************** Form name, image & description ***************/}

            <Col className="col-8" >
              <Row>
                <Col className="col-4" >
                  <Row style={{ paddingBottom: 15 }}>
                    <Col><Input className="form_name_input" placeholder='Untitled Poll' size="lg" /></Col>
                  </Row>
                  <Row>
                    <Col > <Input className="form_description_input" placeholder='Description' /></Col>
                  </Row>
                </Col>
                <Col className='form-image '>
                  <Image_Upload_Function />
                </Col>
              </Row>
            </Col>

            {/***************** From settings ***************/}

            <Col className="form-settings">
              <Row>  <h6 className='text-center' style={{ fontWeight: 700, paddingTop: 10 }}>Poll Settings</h6></Row>

              <Row>
                <Col className=' col-8'>
                  <p style={{ margin: '0' }}>Shuffle questions order</p>
                </Col>
                <Col className=''>
                  <FormGroup switch>
                    <Input type="switch" role="switch" />
                  </FormGroup>
                </Col>
              </Row>
              <Row className=''>
                <Col className=' col-8'>
                  <p style={{ margin: '0' }}>Collect email addresses</p>
                </Col>
                <Col className=''>
                  <FormGroup switch>
                    <Input type="switch" role="switch" />
                  </FormGroup>              </Col>
              </Row>
              <Row className=''>
                <Col className=' col-8'>
                  <p style={{ margin: '0' }}>Allow edit response</p>
                </Col>
                <Col className=''>
                  <FormGroup switch>
                    <Input type="switch" role="switch" />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
          {/******************* Question section ******************/}

          {/* Function that adds a new clean question section*/}
          <ComponentAdder />
        </div>
      </div>
    </div>
  )
}
