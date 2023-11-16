import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input, Row, Col } from 'reactstrap'

const Answer = ({ ids, type, text }) => {

    const { setValue } = useFormContext();

    useEffect(() => {
        if(type !== 'text') {
            setValue(`questions.${ids.question}.answers.${ids.answer}.original_index`, ids.answer);
        }
    }, []);

    return (
        <Row >
            <Col sm={12} className='d-flex gap-2' title={text}>
                <Input type={type} name={`answer${ids.answer}-type`} disabled />
                <Input type='text' name={`answer${ids.answer}-text`} placeholder={text} disabled />
            </Col>
        </Row>
    )
}

export default Answer