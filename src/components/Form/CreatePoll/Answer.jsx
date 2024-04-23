import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input, Col } from 'reactstrap'

const Answer = ({ ids, type, text }) => {

    const { setValue } = useFormContext();

    useEffect(() => {
        if (type !== 'text') {
            setValue(`questions.${ids.question}.answers.${ids.answer}.original_index`, ids.answer);
        }
    }, []);

    return (
        <Col xs={10} className='d-flex gap-2' title={text}>
            <Input type={type} name={`answer${ids.answer}-type`} disabled />
            <Input type='text' name={`answer${ids.answer}-text`} placeholder={text} disabled />
        </Col>
    )
}

export default Answer