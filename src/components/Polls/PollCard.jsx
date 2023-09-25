import React, { useEffect, useState } from 'react'
import PollCardOptions from './PollCardOptions'
import { Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

export default function PollCard({ id }) {
    const { auth } = useAuth();
    const navigate = useNavigate();

    const [poll, setPoll] = useState({});
    const [ownerUsername, setOwnerUsername] = useState('');
    const [isEditable, setIsEditable] = useState(false);
    const [visible, setVisible] = useState(true);

    const performAction = (action) => {
        switch (action) {
            case 'Rename':
                setIsEditable((prevState) => !prevState);
                break;
            case 'Remove':
                setVisible(false);
                break;
            case 'Edit':
                navigate(`poll/${id}/edit`);
                break;
            default:
                break;
        }
    }

    const renameFinished = ({ target }) => {
        if (target.value.length > 0) {
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

    const handleClick = () => {
        navigate(`poll/${id}`);
    }

    const getPollData = async () => {
        const result = await axios.get(`/polls/${id}`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`
            },
            withCredentials: true
        });
        setPoll(result.data.foundPoll);
        getOwnerName(result.data.foundPoll.ownerId);
    }

    const getOwnerName = async (id) => {
        const result = await axios.get(`/users/${id}`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`
            },
            withCredentials: true
        });
        setOwnerUsername(result.data.foundUser.username);
    }

    useEffect(() => {
        getPollData();
    }, []);

    return (
        visible && <div className='poll-card'>
            <div className="poll-card-header">
                <div className="title">
                    {isEditable ?
                        <Input placeholder='Poll title'
                            defaultValue={poll.title}
                            innerRef={el => el && showInput(el)}
                            onBlur={(target) => renameFinished(target)}
                            onKeyDown={(event) => event.key === 'Enter' && renameFinished(event)} /> :
                        <span>{poll.title}</span>}
                    <span>{poll.creation_date}</span>
                </div>
                <div className="icon">
                    <PollCardOptions actionFunction={performAction} owner={ownerUsername} />
                </div>
            </div>
            <div className="poll-card-body" onClick={handleClick}>
                {/* <img src={'/assets/images/preview.svg'} alt="poll_preview" /> */}
            </div>
        </div>
    )
}
