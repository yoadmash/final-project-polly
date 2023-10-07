import { useEffect } from 'react'
import { Input, Row, Col } from 'reactstrap'
import { useFormContext } from 'react-hook-form';

const Answer = ({ ids, type, text }) => {

    const { setValue } = useFormContext();

    useEffect(() => {
        setValue(`questions[${ids.question}].answers[${ids.answer}]`, text);
    }, [setValue, ids, text]);

    return (
        // <div className='d-flex gap-3 align-items-center mb-2'>
        //     <div className='d-flex align-items-center gap-3 w-100' title={text}>
        // <Input type={type} disabled />
        // <Input type='text' placeholder={text} disabled />
        //     </div>
        // </div>
        <Row >
            <Col sm={12} className='d-flex gap-2' title={text}>
                <Input type={type} name={`answer${ids.answer}-type`} disabled />
                <Input type='text' name={`answer${ids.answer}-text`} placeholder={text} disabled />
            </Col>
        </Row>
    )
}

export default Answer