import "./CSS/Export.css";
import { Row, Col } from 'reactstrap';
import SurveyExport from "./ExportSelections";

export default function ExportPage() {

  const questionsData = [
    {
      questionHeader: 'What is the day today?',
      type: 'checkbox',
      answers: ['Saturday', 'Answer 2', 'Answer 3', 'Answer 4'],
      chosenAnswer: [1],


    },
    {
      questionHeader: 'What is kokavit?',
      type: 'checkbox',
      answers: ['Answer1', 'Answer 2', 'not sulamit!', 'also sigalit'],
      chosenAnswer: [3, 4],

    },
    {
      questionHeader: 'Write anything you want',
      type: 'text',
      answer: 'Loram ipsum dulor agiwn vausd gho asdkasdkask da;ldk a;lksd;lak;lkfd;lg kdl;fgkaslkdalSharedWorkerlask',

    },
  ];

  const receivedCountAnswers = [
    { questionIndex: 0, answerIndex: 1, count: 5 },
    { questionIndex: 0, answerIndex: 2, count: 3 },
    { questionIndex: 0, answerIndex: 3, count: 10 },
    { questionIndex: 0, answerIndex: 4, count: 40 },
    { questionIndex: 1, answerIndex: 1, count: 10 },
    { questionIndex: 1, answerIndex: 2, count: 0 },
    { questionIndex: 1, answerIndex: 3, count: 3 },
    { questionIndex: 1, answerIndex: 4, count: 7 },
  ];


  return (
    <div className='export-page'>
      <Row className='export-layout'>
        <Col xs={10} sm={8} md={6} style={{ padding: 0 }}>
          <Row className="export-image-frame"> {/**Form Image */}
            <div className="export-image-container">
              <img className="export-image" src="/assets/images/Lambu.jpg" alt="" />
            </div>
          </Row>
          <Row className="export-rows" > {/**Form Name */}
            <h1 style={{ textAlign: "center", margin: "3px" }}> Poll Name</h1>
          </Row>
          <Row className="export-rows " > {/**Form description */}
            <h4 style={{ textAlign: "center", margin: "3px" }}> Poll Description</h4>
          </Row>
          <Row>
            <SurveyExport
              questionsData={questionsData}
              receivedCountAnswers={receivedCountAnswers}
            />
          </Row>
        </Col>
      </Row>
    </div >
  )
}
