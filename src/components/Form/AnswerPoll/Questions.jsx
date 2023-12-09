import React, { useEffect, useState } from 'react';
import Question from './Question';

const Questions = ({ questions, shuffle, isOwner }) => {

    const [shuffled, setShuffled] = useState(false);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);

    useEffect(() => {
        if(!shuffled) {
            setShuffledQuestions(!shuffle ? questions : [...questions].sort(() => 0.5 - Math.random()));
            setShuffled(true);
        }
    }, [shuffled, shuffle, questions]);


    return (
        <>
            {shuffledQuestions?.map((question) =>
                <Question key={`question_${question.original_index}`}
                    question={question}
                    q_index={question.original_index}
                    settings={question.settings}
                    isOwner={isOwner}
                />
            )}
        </>
    )
}

export default Questions