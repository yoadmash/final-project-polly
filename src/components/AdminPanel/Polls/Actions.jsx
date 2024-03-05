import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import AdminPanelContext from '../../../contexts/AdminPanelProvider';

const Actions = ({ poll, setPoll, setModal }) => {

    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const { users, setUser } = useContext(AdminPanelContext);

    const owner = users.find(user => user._id === poll.owner.id);

    const actions = [
        { title: 'Change owner', icon_src: '/assets/images/ProfilePicMockup.svg', action: 'change-owner' },
        { title: 'Edit', icon_src: '/assets/images/edit.svg', action: 'edit-poll' },
        { title: 'Clear answers', icon_src: '/assets/images/erase.svg', action: 'clear-answers' },
        { title: 'Delete', icon_src: '/assets/images/remove.svg', action: 'delete-poll' },
    ]

    const preformAction = async (action) => {
        switch (action) {
            case 'change-owner':
                setModal({ state: true, poll });
                break;
            case 'edit-poll':
                navigate(`/poll/${poll._id}/edit?by_admin=true`);
                break;
            case 'clear-answers':
                try {
                    await axiosPrivate.post(`/polls/${poll._id}/clear_answers`);
                    poll.answers = 0;
                    setPoll(poll._id, poll);
                } catch (err) {
                    console.log(err.message);
                }
                break;
            case 'delete-poll':
                try {
                    await axiosPrivate.post('/polls/delete?by_admin=true', { pollId: poll._id });
                    if(owner) {
                        owner.polls_created = owner.polls_created.filter(pollId => pollId !== poll._id);
                        setUser(owner._id, owner);
                    }
                    setPoll(poll._id, null);
                } catch (err) {
                    console.log(err);
                }
                break;
            default:
                break;
        }
    }

    return (
        <ul>
            {actions.map((item, index) => {
                return (
                    <li
                        key={index}
                        title={item.title}
                        onClick={() => preformAction(item.action)}
                    >
                        <img
                            className='actions'
                            src={item.icon_src}
                            alt={item.title}
                        />
                    </li>
                )
            })}
        </ul>
    )
}

export default Actions