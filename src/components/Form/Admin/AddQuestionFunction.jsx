import React, { useState } from 'react';
import QuestionSection from './AdminQuestionSection';

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
        <div key={component.key}>
          {component}
          <div style={{ padding: 10, display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
            <button style={{ border: 'none', backgroundColor: 'chartreuse', borderRadius: 5, width: '30%' }} onClick={() => deleteComponent(component.key)}>
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
