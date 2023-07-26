import React, { useState } from 'react';
import QuestionSection from './AdminQuestionSection';

const ComponentAdder = () => {
  const [components, setComponents] = useState([<QuestionSection key={0} />]);

  const addComponent = () => {
    setComponents(prevComponents => [...prevComponents, <QuestionSection key={prevComponents.length} />]);
  };

  const deleteComponent = index => {
    setComponents(prevComponents => prevComponents.filter((_, i) => i !== index));
  };

  return (
    <div>
      {components.map((component, index) => (
        <div key={index} >
          {component}
          <div style={{ padding: 10, display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
            <button style={{ border: 'none', backgroundColor: 'chartreuse', borderRadius: 5, width: '30%' }} onClick={() => deleteComponent(index)}>
              Delete Question
            </button>
          </div>
        </div>
      ))}
      {components.length === 0 ? (
        <div style={{ padding: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <button style={{ border: 'none', backgroundColor: 'lightgreen', borderRadius: 5, width: '30%' }} onClick={addComponent}>
            Add first Question!
          </button>
        </div>
      ) : (
        <div style={{ padding: 5, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <button style={{ border: 'none', backgroundColor: 'lightgreen', borderRadius: 5, width: '30%' }} onClick={addComponent}>
            Add New Question
          </button>
        </div>
      )}
    </div>
  );
};

export default ComponentAdder;
