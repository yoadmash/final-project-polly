import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Input, Button } from 'reactstrap';

const FormComponent = () => {
    const [formInputs, setFormInputs] = useState([]);
    const [ghostInput, setGhostInput] = useState('');
    const ghostInputRef = useRef(null);

    const handleInputChange = (event, index) => {
        const { name, value } = event.target;
        const updatedInputs = [...formInputs];
        updatedInputs[index] = { ...updatedInputs[index], [name]: value };
        setFormInputs(updatedInputs);
    };

    const handleGhostInputChange = (event) => {
        setGhostInput(event.target.value);
    };

    const handleGhostInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setFormInputs([...formInputs, { [`inputField${formInputs.length}`]: ghostInput }]);
            setGhostInput('');
        }
    };

    const handleRemoveInput = (index) => {

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // You can perform additional operations with the formInputs here
        console.log(formInputs);
    };

    useEffect(() => {
        if (ghostInputRef.current) {
            ghostInputRef.current.focus();
        }
    }, [formInputs]);

    return (
        <form onSubmit={handleSubmit}>
            {formInputs.map((input, index) => (
                <Row key={index}>
                    <Col className="col-1"><Input type="checkbox" /></Col>
                    <Col className="col-8">
                        <Input
                            type="text"
                            name={`inputField${index}`}
                            value={input[`inputField${index}`] || ''}
                            onChange={(event) => handleInputChange(event, index)}
                        />
                    </Col>
                    <Col>
                        <Button onClick={() => handleRemoveInput(index)}>
                            X
                        </Button>
                    </Col>
                </Row>
            ))}
            <Row>
                <Col className="col-1"><Input type="checkbox" /></Col>

                <Col>
                    <Input
                        style={{ opacity: 0.5 }}
                        type="text"
                        placeholder="Add input"
                        value={ghostInput}
                        onChange={handleGhostInputChange}
                        onKeyDown={handleGhostInputKeyDown}
                        ref={ghostInputRef}
                    />
                </Col>
            </Row>
        </form>
    );
};

export default FormComponent;
