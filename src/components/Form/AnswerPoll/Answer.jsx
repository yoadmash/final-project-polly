import React, { useEffect } from 'react';
import { Label } from 'reactstrap';
import { useFormContext } from 'react-hook-form';
import UseFormInput from '../UseFormInput';

const Answer = ({ a_index, answer, q_index, type, settings }) => {

    const { register, setValue } = useFormContext();

    useEffect(() => {
        setValue(`answers.${q_index}.value`, null);
    }, []);

    return (
        <div key={`answer_${a_index}`}>
            <UseFormInput
                name={`answers.${q_index}.value`}
                type={type}
                register={register}
                value={JSON.stringify(answer)}
                validation={{
                    required: {
                        value: settings.required,
                        message: '* Required'
                    }
                }}
            />
            <Label check className='ms-2'>{answer.title}</Label>
        </div>
    )
}

export default Answer