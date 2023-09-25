import "./CSS/UserForm.css";
import { Row, Col, Button } from 'reactstrap';
import SurveyComponent from "./UserSelections";
import { useNavigate, useParams } from "react-router-dom";
import GoBackLink from "../../Layout/GoBackLink";
import axios from '../../../api/axios';
import useAuth from '../../../hooks/useAuth';
import { useEffect } from "react";


export default function UserFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { auth } = useAuth();

  const checkIfPollExist = async () => {
    try {
      await axios.get(`/polls/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        },
        withCredentials: true
      });
    } catch (err) {
      navigate('/poll-not-found');
    }
  }

  useEffect(() => {
    checkIfPollExist();
  }, []);

  const questionsData = [
    {
      question: 'How far is eilat from tel aviv?',
      questionType: 'Multiple Choices',
      answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
    },
    {
      question: 'Question 2 - multi',
      questionType: 'Multiple Choices',
      answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
    },
    {
      question: 'Question 3-text',
      questionType: 'Text',
      answers: [''],
    },
    {
      question: 'Question 4-one choice',
      questionType: 'One Choice',
      answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
    },
  ];

  return (
    <div className='user-form-Page'>
      <GoBackLink />
      <Row className='user-form-layout '>
        <Col xs={10} sm={8} md={6} style={{ padding: 0 }} >
          <Row className="user-image-frame">    {/**Form Image */}
            <div className="user-image-container">
              <img className="user-form-image" src="/assets/images/Lambu.jpg" alt="" />
            </div>
          </Row>
          <Row className="user-form-rows" > {/**Form Name */}
            <h1 style={{ textAlign: "center", margin: "3px" }}> Poll Name</h1>
          </Row>
          <Row className="user-form-rows " > {/**Form description */}
            <h4 style={{ textAlign: "center", margin: "3px" }}> Poll Description</h4>
          </Row>
          <Row>
            <SurveyComponent
              questions={questionsData}
              shuffleQuestionsOrder={false}
              submitAnonymously={false} />
          </Row>
          <Row className="user-submit-row">
            <Button className="user-submit-btn">Submit</Button>
          </Row>
        </Col>
      </Row>


    </div >

  )
}
