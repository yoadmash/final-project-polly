import React from 'react'
import { Row, Col, Input } from 'reactstrap';
import './CSS/AdminForm.css';



export default function AddTextInput() {
    return (
        <div >
            <Row style={{ paddingBottom: '10px', display: 'flex', flexDirection: 'column', flexFlow: 'row', justifyContent: 'center', alignItems: "center" }}>
                <Col className="p-0">
                    <Input
                        readOnly
                        type="text"
                        name={`inputField`}
                        placeholder='Enter your answer here..'
                        style={{ opacity: 0.5, backgroundColor: '#f1f1f1', height: "50px" }}
                    />

                </Col>
            </Row>
        </div>
    )
}
