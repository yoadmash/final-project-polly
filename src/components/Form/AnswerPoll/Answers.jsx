import React, { useState, useEffect } from 'react';
import UseFormInput from '../UseFormInput';
import Answer from './Answer';
import { useFormContext } from 'react-hook-form';

const Answers = ({ answers, type, q_index, settings }) => {

    const [shuffled, setShuffled] = useState(false);
    const [shuffledAnswers, setShuffledAnswers] = useState([]);

    const { register, formState: { errors } } = useFormContext();

    useEffect(() => {
        if (!shuffled) {
            setShuffledAnswers(!answers || !settings.shuffleAnswers ? answers : [...answers].sort(() => 0.5 - Math.random()));
            setShuffled(true);
        }
    }, [shuffled, settings.shuffleAnswers, answers]);

    return (
        <div>
            {!answers
                ?
                <UseFormInput
                    type={'textarea'}
                    name={`answers.${q_index}.value`}
                    register={register}
                    validation={{
                        required: {
                            value: settings.required,
                            message: "* Required"
                        },
                    }}
                    onInput={(event) => {
                        if(event.target.value.length === 0) {
                            event.target.style.height = 'auto';
                        } else if(event.target.scrollHeight < 300 && event.target.scrollHeight > 60) {
                            event.target.style.height = event.target.scrollHeight + 'px';
                        }
                    }}
                />
                :
                shuffledAnswers.map((answer, index) => (
                    <Answer
                        key={index}
                        a_index={answer.original_index}
                        answer={answer}
                        q_index={q_index}
                        type={type}
                        settings={settings}
                    />
                ))}
            {errors?.answers?.[q_index]?.value?.message && <p className='validation-msg mt-1'>{errors?.answers?.[q_index]?.value?.message}</p>}
        </div>
    )
}

export default Answers