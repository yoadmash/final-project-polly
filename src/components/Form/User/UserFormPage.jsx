import React, { useState } from "react";
import "./CSS/UserForm.css";
import { Row, Col, Input, FormGroup } from 'reactstrap';
import QuestionSection from "./UserQuestionSection";

// import QuestionSection from "./QuestionSection";



export default function UserFormPage() {
  return (
    <div>
      <div className='form_Page'>
        <div className='form_layout'>
          <Row style={{ display: "flex", gap: "10px", borderRadius: "5,5,5,5" }}>
            <Row className="form_rows form_image ">
              test
            </Row>
            {/* * **************** Form Answers **************  */}

            <Row className="form_rows" >
              <h1 style={{ textAlign: "center" }}> Poll Name</h1>
            </Row>
            <Row className="form_rows" >
              <h4 style={{ textAlign: "center" }}> Poll Description</h4>
            </Row>
            <Row className="questions_section">
              <QuestionSection />

            </Row>

          </Row>

        </div>
      </div>
    </div>
  )
}
