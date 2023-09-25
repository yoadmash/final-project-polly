import "./CSS/UserForm.css";
import { Row } from 'reactstrap';
import SurveyComponent from "./UserSelectionGPT";
import { useParams } from "react-router-dom";
import GoBackLink from "../../Layout/GoBackLink";


export default function UserFormPage() {
  const { id } = useParams();

  const questionsData = [
    {
      question: 'Question 1',
      answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
    },
    {
      question: 'Question 2',
      answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
    },
    {
      question: 'Question 3',
      answers: ['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4'],
    },
  ];

  return (
    <div className='form-Page'>
      <GoBackLink/>
      <div className='form-layout'>
        <Row style={{ display: "flex", gap: "10px", borderRadius: "5,5,5,5" }}>
          <Row className="form-rows form-image "></Row>

          {/* * * **************** Form **************  */}
          <Row className="form-rows" >
            <h1 style={{ textAlign: "center", margin: "3px" }}>Poll Name (ID: {id})</h1>
          </Row>
          <Row className="form-rows" >
            <h4 style={{ textAlign: "center", margin: "3px" }}>Poll Description</h4>
          </Row>
          {/* <QuestionSection /> */}
          <SurveyComponent
            questions={questionsData}
            shuffleQuestionsOrder={false}
            submitAnonymously={false} />
        </Row>
      </div>
    </div>
  )
}
