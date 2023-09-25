import React, { useState } from 'react';
import QuestionSection from './AdminQuestionSection';
import { Col, Row } from 'reactstrap';

const ComponentAdder = () => {
  const [components, setComponents] = useState([]);
  const [keyCounter, setKeyCounter] = useState(0);

  const addComponent = () => {
    const newKey = keyCounter.toString();
    setKeyCounter(prevCounter => prevCounter + 1);
    const newComponent = <QuestionSection key={newKey} />;
    setComponents(prevComponents => [...prevComponents, newComponent]);
  };

  const deleteComponent = keyToDelete => {
    setComponents(prevComponents => prevComponents.filter(component => component.key !== keyToDelete));
  };

  return (
    <div>

      {components.map(component => (
        <Row key={component.key} style={{ paddingBottom: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Col md={11} lg={11} style={{}}> {component}</Col>
          <Col md={1} lg={1} style={{ padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
            <button className='delete-question-btn' onClick={() => deleteComponent(component.key)}>
              <img style={{ width: '25px', height: '25px' }} src='/assets/images/remove_question.svg' alt='delete' />
            </button>
          </Col>
        </Row>

      ))}
      {components.length === 0 ? (
        <div style={{ padding: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <button style={{ border: 'none', backgroundColor: '#00bf63', borderRadius: 5, width: '150px', color: 'white' }} onClick={addComponent}>
            Add first Question!
          </button>
        </div>
      ) : (

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
          <button style={{ border: 'none', backgroundColor: '#00bf63', borderRadius: 50, height: '30px', width: '30px', color: 'white' }} onClick={addComponent}>
            <img src='/assets/images/add_question.svg' alt='addQuestion' />
          </button>
          <p style={{ display: 'flex', justifyContent: 'center', color: 'black', width: '150px', fontSize: '12px' }}>Add Question</p>
        </div>
      )}
    </div >
  );
};

export default ComponentAdder;
