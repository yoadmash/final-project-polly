import "./CSS/AdminForm.css";
import { Row, Col, Input, FormGroup } from 'reactstrap';
import ComponentAdder from "./AddQuestionFunction";
import PollImage from "./PollImage";
import GoBackLink from "../../Layout/GoBackLink";
import { useState } from "react";

export default function AdminFormPage() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pollSettings, setPollSettings] = useState({
    shuffleQuestionOrder: false,
    submitAnonymously: false
  });
  const [questions, setQuestions] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(title);
    console.log(description);
    console.log(pollSettings);
  }

  return (
    <div className='form-Page'>
      <GoBackLink />
      <Row className='form-layout'>
        {/***************** Form name, image & description ***************/}
        <Col xs={10} sm={8} md={6} className="" style={{ padding: 0 }}>
          <Row className="form-name-image">
            <Col xs={12} sm={6} lg={6} >
              <Row >
                <Col >
                  <Row >
                    <Input className="form-name-input" onChange={(event) => setTitle(event.target.value)} placeholder='Untitled Poll' />
                  </Row>
                  <Row >
                    <Input className="form-description-input" onChange={(event) => setDescription(event.target.value)} placeholder='Description' />
                  </Row>
                </Col>
              </Row>
            </Col>

            <Col xs={5} sm={6} lg={6} className="">
              <PollImage />
            </Col>
          </Row>
          {/***************** From settings ***************/}

          <Row className="form-settings">
            <Row>
              <h5 style={{ fontWeight: 500, paddingTop: 10, textAlign: "center" }}>Poll Settings</h5>
            </Row>
            <Row>
              <Col xs={10} sm={10} md={10} lg={11}>
                <p style={{ margin: '0' }}>Shuffle Questions Order</p>
              </Col>
              <Col xs={2} sm={2} md={2} lg={1}>
                <FormGroup switch>
                  <Input type="switch" role="switch"
                    onChange={() => setPollSettings(prev => {
                      return { ...prev, shuffleQuestionOrder: !prev.shuffleQuestionOrder }
                    })} />
                </FormGroup>
              </Col>
            </Row>
            <Row >
              <Col xs={10} sm={10} md={10} lg={11}>
                <p style={{ margin: '0' }}>Submit Anonymously</p>
              </Col>
              <Col xs={2} sm={2} md={2} lg={1}>
                <FormGroup switch>
                  <Input type="switch" role="switch"
                    onChange={() => setPollSettings(prev => {
                      return { ...prev, submitAnonymously: !prev.submitAnonymously }
                    })} />
                </FormGroup>
              </Col>
            </Row>
          </Row>

          {/******************* Question section ******************/}

          {/* Function that adds a new clean question section*/}
          <ComponentAdder setQuestions={setQuestions} />
          <button type="submit" onClick={(e) => handleSubmit(e)}>Save</button>
        </Col>
      </Row>
    </div>
  )
}
