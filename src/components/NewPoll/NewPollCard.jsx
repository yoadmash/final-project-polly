import React from 'react'

export default function NewPollCard({ template }) {
    return (
        <div className={!template ? 'newpoll-button' : 'newpoll-template'}>
            <img src={`/assets/images/${!template ? 'plus_icon.svg' : 'template_icon.svg'}`} alt='startnewpoll' />
            <h5>{!template ? 'New Poll' : 'Template'}</h5>
        </div>
    )
}
