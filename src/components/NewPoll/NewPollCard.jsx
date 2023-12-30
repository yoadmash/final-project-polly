import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function NewPollCard({ template, title }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (!template) {
            navigate('/poll/create/new');
        } else {
            navigate(`/poll/create/new?template=${title}`);
        }
    }

    return (
        <div className={!template ? 'newpoll-button' : 'newpoll-template'} onClick={handleClick}>
            <img src={`/assets/images/${!template ? 'plus_icon.svg' : 'template_icon.svg'}`} alt='startnewpoll' />
            <h6>{!template ? 'New Poll' : title}</h6>
        </div>
    )
}
