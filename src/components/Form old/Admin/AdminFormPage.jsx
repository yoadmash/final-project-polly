import "./CSS/AdminForm.css";
import { Row, Col, Input, FormGroup } from 'reactstrap';
import ComponentAdder from "./AddQuestionFunction";
import PollImage from "./PollImage";
import GoBackLink from "../../Layout/GoBackLink";


export default function AdminFormPage() {
  return (
    <div className='form-Page'>
      <GoBackLink/>
      <div className='form-layout'>
        {/***************** Form name, image & description ***************/}

        <Row>
          <Col className="col-8" >
            <Row>
              <Col className="" >
                <Row>
                  <Input className="form-name-input" placeholder='Untitled Poll' size="lg" />
                </Row>
                <Row>
                  <Col> <Input className="form-description-input" placeholder='Description' /></Col>
                </Row>
              </Col>
            </Row>
          </Col>

          {/***************** From settings ***************/}

          <Col className="image-col col-4">
            <PollImage />
          </Col>
        </Row>
        <Row className="form-settings">
          <Row>  <h6 className='text-center' style={{ fontWeight: 700, paddingTop: 10 }}>Poll Settings</h6></Row>
          <div style={{ paddingLeft: '40px' }}>
            <Row className="">
              <Col className=' col-10 '>
                <p style={{ margin: '0' }}>Shuffle Questions Order</p>
              </Col>
              <Col className='col-2'>
                <FormGroup switch>
                  <Input type="switch" role="switch" />
                </FormGroup>
              </Col>
            </Row>
            <Row className="">
              <Col className='col-10'>
                <p style={{ margin: '0' }}>Submit Anonymously</p>
              </Col>
              <Col className='col-2'>
                <FormGroup switch>
                  <Input type="switch" role="switch" />
                </FormGroup>              </Col>
            </Row>

          </div>
        </Row>

        {/******************* Question section ******************/}

        {/* Function that adds a new clean question section*/}
        <ComponentAdder />
      </div>
    </div>
  )
}
