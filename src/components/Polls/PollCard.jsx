import React, { useEffect, useState } from 'react'
import PollCardOptions from './PollCardOptions'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import ReactLoading from 'react-loading';

export default function PollCard({ id, managePolls }) {

    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const navigate = useNavigate();

    const [poll, setPoll] = useState({});
    const [visible, setVisible] = useState(true);
    const [deleting, setDeleting] = useState(false);

    const performAction = (action) => {
        switch (action) {
            case 'Edit':
                navigate(`poll/${id}/edit`);
                break;
            case 'Copy Link':
                navigator.clipboard.writeText(`${document.URL}poll/${id}`);
                break;
            case 'Open in new tab':
                window.open(`/poll/${id}`, '_blank')
                break;
            case 'Delete Poll':
            case 'Remove':
                deletePoll();
                break;
            case 'View Answers':
                if (poll.owner.id === auth.userId) {
                    navigate(`poll/${id}/summary`);
                } else {
                    navigate(`poll/${id}/view_answers`);
                }
                break;
            default:
                break;
        }
    }

    const handleClick = () => {
        navigate(`poll/${id}`);
    }

    const getPollData = async () => {
        try {
            const response = await axiosPrivate.get(`/polls/${id}`);
            setPoll(response.data.foundPoll);
        } catch (err) {
            managePolls.setPolls((prev) => prev.filter(poll => poll !== id));
        }
    }

    const deletePoll = async () => {
        setDeleting(true);
        try {
            const updatedPolls = managePolls.polls.filter(poll => poll !== id);
            await axiosPrivate.post(`/polls/delete`, { pollId: id });
            managePolls.setPolls(updatedPolls);
        } catch (err) {
            console.log(err);
        } finally {
            setDeleting(false);
            setVisible(false);
        }
    }

    useEffect(() => {
        getPollData();
    }, []);

    return (
        visible && poll && <div className='poll-card'
            style={{
                backgroundImage: (poll.image_path)
                    ? `url(${poll.image_path})`
                    : `url(/assets/images/view_answers.svg)`,
                backgroundSize: (poll.image_path)
                    ? 'cover'
                    : '50%',
                backgroundPosition: (poll.image_path)
                    ? ''
                    : '50% 90%'
            }}>
            <div className="poll-card-header">
                <div className="title">
                    <span>{poll.title}</span>
                    <span>{poll.creation_date}</span>
                </div>
                <div className="icon">
                    <PollCardOptions actionFunction={performAction} owner={poll?.owner?.username} />
                </div>
            </div>
            <div className="poll-card-body" onClick={handleClick}>
                {deleting &&
                    <div className='deleting'>
                        <ReactLoading type='cylon' color='#FFFFFF' />
                        <span style={{ color: '#FFFFFF', fontWeight: 500 }}>Removing poll...</span>
                    </div>
                }
            </div>
        </div>
    )
}
