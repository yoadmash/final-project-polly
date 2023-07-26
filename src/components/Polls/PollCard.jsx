import React, { useState } from 'react'
import PollCardOptions from './PollCardOptions'
import { Input } from 'reactstrap'

export default function PollCard({ title, creation_date, owner, preview_img, editable }) {
    const [pollTitle, setPollTitle] = useState(title);
    const [isEditable, setIsEditable] = useState(editable);
    const [visible, setVisible] = useState(true);

    const performAction = (action) => {
        switch (action) {
            case 'Rename':
                setIsEditable((prevState) => !prevState);
                break;
            case 'Remove':
                setVisible(false);
                break;
            default:
                break;
        }
    }

    const renameFinished = ({ target }) => {
        if (target.value.length > 0) {
            setPollTitle(target.value);
            setIsEditable(false);
        } else {
            target.style.boxShadow = '0px 2px rgba(255, 0, 0, 0.5)';
            target.focus();
            setTimeout(() => {
                target.style = null;
            }, 500);
        }
    }

    const showInput = (el) => {
        el.focus();
        el.setSelectionRange(0, el.value.length);
    }

    return (
        visible && <div className='poll-card'>
            <div className="poll-card-header">
                <div className="title">
                    {isEditable ?
                        <Input placeholder='Poll title'
                            defaultValue={pollTitle}
                            innerRef={el => el && showInput(el)}
                            onBlur={(target) => renameFinished(target)} 
                            onKeyDown={(event) => event.key === 'Enter' && renameFinished(event)}/> :
                        <span>{pollTitle}</span>}
                    <span>{creation_date}</span>
                </div>
                <div className="icon">
                    <PollCardOptions actionFunction={performAction} owner={owner}/>
                </div>
            </div>
            <div className="poll-card-body">
                <img src={preview_img} alt="poll_preview" />
            </div>
        </div>
    )
}
