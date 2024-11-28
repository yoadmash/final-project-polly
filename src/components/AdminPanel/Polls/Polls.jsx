import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Table, Modal, ModalHeader, ModalBody } from 'reactstrap';
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import AdminPanelContext from '../../../contexts/AdminPanelProvider';
import Search from '../Search';
import Poll from './Poll';
import UserItem from './UserItem';
import { Slide, toast } from 'react-toastify';

const Polls = ({ setPollsCount }) => {
    const { auth } = useAuth();
    const { users, setUsers, setUser } = useContext(AdminPanelContext);
    const axiosPrivate = useAxiosPrivate();

    const [polls, setPolls] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [modal, setModal] = useState({ state: false, poll: {} });

    const getAllPolls = useCallback(async () => {
        try {
            const response = await axiosPrivate.get('/polls/get_all_polls');
            setPolls(response.data.allPollsFormatted);
            setSearchResult(response.data.allPollsFormatted);
        } catch (err) {
            console.log(err);
        }
    }, [axiosPrivate, setPolls, setSearchResult]);

    const getAllUsers = useCallback(async () => {
        try {
            const response = await axiosPrivate.get('/users/get_all_users');
            setUsers(response.data.allUsers);
        } catch (err) {
            console.log(err.message);
        }
    }, [axiosPrivate, setUsers]);

    const setPoll = (pollId, updatedPoll) => {
        if (updatedPoll) {
            setPolls(prev => prev.map(poll => poll._id === pollId ? updatedPoll : poll));
        } else {
            const updatedPolls = polls.filter(poll => poll._id !== pollId);
            setSearchResult(updatedPolls);
            setPolls(updatedPolls);
        }
    }

    const searchPolls = (searchValue) => {
        if (searchValue.length > 0) {
            searchValue = searchValue.toLowerCase();
            setSearchResult(polls.filter(poll => poll.title.toLowerCase().includes(searchValue) || poll.owner.username.toLowerCase().includes(searchValue)));
        }
    }

    const setAsOwner = async (user) => {
        const old_owner_id = modal.poll.owner.id;
        const oldOwnerUser = await users.find(usr => usr._id === old_owner_id);
        const newOwnerUser = await users.find(usr => usr._id === user.user_id);

        modal.poll.owner = {
            id: user.user_id,
            username: user.user_name,
        }

        try {
            await axiosPrivate.post(`/polls/${modal.poll._id}/change_owner`, { new_owner: modal.poll.owner });

            oldOwnerUser.polls_created = oldOwnerUser.polls_created.filter(poll => poll !== modal.poll._id);
            setUser(old_owner_id, oldOwnerUser);

            newOwnerUser.polls_created.push(modal.poll._id);
            setUser(newOwnerUser._id, newOwnerUser);

            setPoll(modal.poll.id, modal.poll);
            toggle();
            toast.success('Poll owner changed', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                theme: "light",
                transition: Slide,
            })
        } catch (err) {
            toast.error(err || 'An error has been occurred', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                theme: "light",
                transition: Slide,
            })
        }
    }

    const toggle = () => {
        setModal({ state: false, poll: {} })
        setUsers(prev => prev.filter(usr => usr._id !== auth.userId));
    };

    useEffect(() => {
        setPollsCount(searchResult.length);
    }, [searchResult.length, setPollsCount])

    useEffect(() => {
        if(auth.admin) {
            getAllPolls();
        }
    }, [auth.admin, getAllPolls]);

    useEffect(() => {
        if (modal.state) {
            getAllUsers();
        }
    }, [modal, getAllUsers]);

    const th = ['', 'Title', 'Owner', 'Created at', 'Answers', 'Settings', 'Actions']; //actions - view, edit?, change owner?, delete poll, delete answers.

    return (
        <div className='polls'>
            <Search
                data={polls}
                searchFunc={searchPolls}
                setSearchResult={setSearchResult}
                placeholder={'Search by title or owner'}
            />
            <Table size='sm' hover responsive className='mt-2'>
                <thead>
                    <tr>
                        {th.map((item, index) => <th key={index}>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {searchResult?.map((poll, index) => <Poll key={index} poll={poll} setPoll={setPoll} setModal={setModal} />)}
                </tbody>
            </Table>
            {modal.state && <Modal isOpen={modal.state} centered fade={false} size='lg'>
                <ModalHeader toggle={toggle} tag={'h3'}>Change owner - {modal.poll.title}</ModalHeader>
                <ModalBody>
                    <div className="content d-flex flex-column gap-3 p-2">
                        {users.map((user, index) =>
                            (user.username !== modal.poll.owner.username) && <UserItem
                                key={index}
                                user_data={{ user_id: user._id, user_name: user.username, profile_pic_path: user.profile_pic_path }}
                                setAsOwner={setAsOwner} />
                        )}
                    </div>
                </ModalBody>
            </Modal>}
        </div>
    )
}

export default Polls