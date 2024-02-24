import React, { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { Button, Input, Table, Modal, ModalHeader, ModalBody, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import User from './User';
import UserPoll from './UserPoll';

const Users = ({ setUsersCount }) => {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const [users, setUsers] = useState([]);
    const [searchValue, setSearchValue] = useState('');
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


    const getAllUsers = async () => {
        try {
            const response = await axiosPrivate.get('/users/get_all_users');
            // setUsers([...response.data.allUsers, ...response.data.allUsers, ...response.data.allUsers, ...response.data.allUsers, ...response.data.allUsers, ...response.data.allUsers, ...response.data.allUsers, ...response.data.allUsers]);
            // setSearchResult([...response.data.allUsers, ...response.data.allUsers, ...response.data.allUsers, ...response.data.allUsers, ...response.data.allUsers, ...response.data.allUsers, ...response.data.allUsers, ...response.data.allUsers]);
            setUsers(response.data.allUsers);
            setSearchResult(response.data.allUsers);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (auth.admin) {
            getAllUsers();
        }
    }, [auth]);

    useEffect(() => {
        setUsersCount(searchResult.length);
    }, [searchResult.length])

    const searhcUsers = (e) => {
        e.preventDefault();
        if (searchValue.length > 0) {
            setSearchResult(users.filter(user => user.username.includes(searchValue) || user.email.includes(searchValue)));
        }
    }

    const setUser = (userId, updatedUser) => {
        setUsers(prev => prev.map(user => user._id === userId ? updatedUser : user));
    }

    const toggle = () => {
        setModal(!modal);
        setActive(0);
    }

    //table
    /*
    if admin add crown icon near username
    table header = profile_pic, username, email, fullname, registered_at, active, actions (viewPolls - opens modal with nav tabs, setAdmin, setActive, resetPassword, removeProfilePic)
    */

    const th = ['', 'Active', 'Username', 'Email', 'Name', 'Registered', 'Actions'];

    return (
        <div className='users'>
            <form className='d-flex gap-3 mt-3' onSubmit={(e) => searhcUsers(e)}>
                <Input type='text' placeholder='Search user by name or email'
                    onChange={(e) => e.target.value.length > 0 ? setSearchValue(e.target.value) : setSearchResult(users)} />
                <Button color='success' type='submit'>Search</Button>
                <Button color='danger' type='reset' onClick={() => setSearchResult(users)}>Clear</Button>
            </form>
            <Table size='sm' hover responsive className='mt-2'>
                <thead>
                    <tr>
                        {th.map((item, index) => <th key={index} className='p-2'>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {searchResult?.map((user, index) => <User key={index} user={user} setUser={setUser} setModal={setModal} />)}
                </tbody>
            </Table>
            {modal.state && <Modal isOpen={modal.state} centered fade={false} size='lg'>
                <ModalHeader toggle={toggle}>{modal.user.username}'s polls</ModalHeader>
                <ModalBody className='p-2'>
                    <Nav tabs>
                        <NavItem>
                            <NavLink active={isActive[0]} onClick={() => setActive(0)}>Created ({modal.user.polls_created?.length})</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink active={isActive[1]} onClick={() => setActive(1)}>Answered ({modal.user.polls_answered?.length})</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink active={isActive[2]} onClick={() => setActive(2)}>Visited ({modal.user.polls_visited?.length})</NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId={0}>
                            {modal?.user.polls_created?.length > 0 && modal.user.polls_created.map((pollId, index) => <UserPoll key={index} id={pollId} />)}
                        </TabPane>
                        <TabPane tabId={1}>
                            {modal?.user.polls_answered?.length > 0 && modal.user.polls_answered.map((pollId, index) => <UserPoll key={index} id={pollId} />)}
                        </TabPane>
                        <TabPane tabId={2}>
                            {modal?.user.polls_visited?.length > 0 && modal.user.polls_visited.map((pollId, index) => <UserPoll key={index} id={pollId} />)}
                        </TabPane>
                    </TabContent>
                </ModalBody>
            </Modal>}
        </div>
    )
}

export default Users