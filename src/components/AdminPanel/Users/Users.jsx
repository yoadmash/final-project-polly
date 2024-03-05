import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Table, Modal, ModalHeader, ModalBody, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import AdminPanelContext from '../../../contexts/AdminPanelProvider';
import User from './User';
import UserPoll from './UserPoll';
import Search from '../Search';

const Users = ({ setUsersCount }) => {

    const {
        users, setUsers,
    } = useContext(AdminPanelContext);

    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const [searchResult, setSearchResult] = useState([]);

    const [activeTab, setActiveTab] = useState(0);
    const [isActive, setIsActive] = useState([true, false, false]);
    const [modal, setModal] = useState({ state: false, user: {} });

    const setActive = (id) => {
        const currentActiveTab = isActive.findIndex(state => state === true);
        setActiveTab(id);
        isActive[currentActiveTab] = false;
        isActive[id] = !isActive[id];
        setIsActive(isActive);
    }

    const getAllUsers = useCallback(async () => {
        try {
            const response = await axiosPrivate.get('/users/get_all_users');
            const allUsers_hideSelf = response.data.allUsers.filter(user => user._id !== auth.userId);
            setUsers(allUsers_hideSelf);
            setSearchResult(allUsers_hideSelf);
        } catch (err) {
            console.log(err);
        }
    }, [axiosPrivate, auth, setUsers, setSearchResult]);

    useEffect(() => {
        if (auth.admin) {
            getAllUsers();
        }
    }, [auth, getAllUsers]);

    useEffect(() => {
        setUsersCount(searchResult.length);
    }, [searchResult.length, setUsersCount]);

    useEffect(() => {
        const allUsers_hideSelf = users.filter(user => user._id !== auth.userId);
        setSearchResult(allUsers_hideSelf);
    }, [users, auth]);

    const searhcUsers = (searchValue) => {
        if (searchValue.length > 0) {
            setSearchResult(users.filter(user => user.username.toLowerCase().includes(searchValue) || user.email.toLowerCase().includes(searchValue)));
        }
    }

    const toggle = () => {
        setModal(!modal.state);
        setActive(0);
    }

    const th = ['', 'Active', 'Username', 'Email', 'Name', 'Registered', "Last login", 'Actions'];

    return (
        <div className='users'>
            <Search
                data={users}
                searchFunc={searhcUsers}
                setSearchResult={setSearchResult}
                placeholder={'Search by username or email'}
            />
            <Table size='sm' hover responsive className='mt-2'>
                <thead>
                    <tr>
                        {th.map((item, index) => <th key={index} className='p-2'>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {searchResult?.map((user, index) => <User key={index} user={user} setModal={setModal} />)}
                </tbody>
            </Table>
            {modal.state && <Modal isOpen={modal.state} centered fade={false} size='lg'>
                <ModalHeader toggle={toggle} tag={'h3'}>{modal.user.username}'s polls</ModalHeader>
                <ModalBody className='p-2'>
                    <Nav tabs>
                        <NavItem>
                            <NavLink active={isActive[0]} onClick={() => setActive(0)}>Created {isActive[0] && `(${modal.user.polls_created?.length})`}</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink active={isActive[1]} onClick={() => setActive(1)}>Answered {isActive[1] && `(${modal.user.polls_answered?.length})`}</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink active={isActive[2]} onClick={() => setActive(2)}>Visited {isActive[2] && `(${modal.user.polls_visited?.length})`}</NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab} className='content'>
                        <TabPane tabId={0}>
                            {
                                modal?.user.polls_created?.length > 0
                                    ? modal.user.polls_created.map((pollId, index) => <UserPoll key={index} id={pollId} />)
                                    : <h5 className='mt-2'>No Polls</h5>
                            }
                        </TabPane>
                        <TabPane tabId={1}>
                            {
                                modal?.user.polls_answered?.length > 0
                                    ? modal.user.polls_answered.map((pollId, index) => <UserPoll key={index} id={pollId} />)
                                    : <h5 className='mt-2'>No Polls</h5>
                            }
                        </TabPane>
                        <TabPane tabId={2}>
                            {
                                modal?.user.polls_visited?.length > 0
                                    ? modal.user.polls_visited.map((pollId, index) => <UserPoll key={index} id={pollId} />)
                                    : <h5 className='mt-2'>No Polls</h5>
                            }
                        </TabPane>
                    </TabContent>
                </ModalBody>
            </Modal>}
        </div>
    )
}

export default Users