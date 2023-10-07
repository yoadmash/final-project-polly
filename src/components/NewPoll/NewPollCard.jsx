import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NewPollCard({ template, title }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (!template) {
            navigate('/create-new-poll');
        } else {
            navigate('/create-new-poll-2');
        }
    }

    return (
        <div className={!template ? 'newpoll-button' : 'newpoll-template'} onClick={handleClick}>
            <img src={`/assets/images/${!template ? 'plus_icon.svg' : 'template_icon.svg'}`} alt='startnewpoll' />
            <h5>{!template ? 'New Poll' : title}</h5>
        </div>
    )
}
