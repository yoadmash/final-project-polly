import React, { useState, useRef, useEffect } from 'react';
import { Row, Col, Input, Button } from 'reactstrap';

const FormComponent = () => {
    const [formInputs, setFormInputs] = useState([]);
    const [ghostInput, setGhostInput] = useState('');
    const ghostInputRef = useRef(null);
    const inputKeyCounter = useRef(0); // Counter for generating unique keys

    const handleInputChange = (event, key) => {
        const { name, value } = event.target;
        const updatedInputs = formInputs.map(input => {
            if (input.key === key) {
                return { ...input, [name]: value };
            }
            return input;
        });
        setFormInputs(updatedInputs);
    };

    const handleGhostInputChange = (event) => {
        setGhostInput(event.target.value);
    };

    const handleGhostInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setFormInputs([...formInputs, { key: inputKeyCounter.current, [`inputField`]: ghostInput }]);
            inputKeyCounter.current += 1;
            setGhostInput('');
        }
    };

    const handleRemoveInput = (key) => {
        const updatedInputs = formInputs.filter(input => input.key !== key);
        setFormInputs(updatedInputs);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
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
                <Row key={input.key} style={{ paddingBottom: '10px', display: 'flex', flexDirection: 'column', flexFlow: 'row', justifyContent: 'center', alignItems: "center" }}>
                    <Col className="col-1"><Input type="checkbox" /></Col>
                    <Col className="col-8">
                        <Input
                            type="text"
                            name={`inputField`}
                            value={input[`inputField`] || ''}
                            onChange={(event) => handleInputChange(event, input.key)}
                        />
                    </Col>
                    <Col>
                        <Button onClick={() => handleRemoveInput(input.key)}>
                            X
                        </Button>
                    </Col>
                </Row>
            ))}
            <Row>
                <Col className="col-1"><Input type="checkbox" /></Col>
                <Col>
                    <Input
                        style={{ opacity: 0.5, width: '80%', height: '80%' }}
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
