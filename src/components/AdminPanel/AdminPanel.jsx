import React, { useEffect, useState } from 'react'
import GoBackLink from '../Layout/GoBackLink'
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import Logs from './Logs/Logs';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import './AdminPanel.css';
import Users from './Users/Users';
import Templates from './Templates/Templates';

const AdminPanel = () => {

    const { auth } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState(0);
    const [usersCount, setUsersCount] = useState(0);
    const [isActive, setIsActive] = useState([true, false, false, false]);

    const setActive = (id) => {
        const currentActiveTab = isActive.findIndex(state => state === true);
        setActiveTab(id);
        isActive[currentActiveTab] = false;
        isActive[id] = !isActive[id];
        setIsActive(isActive);
    }

    useEffect(() => {
        if (!auth.admin) {
            navigate('/');
        }
    }, [auth, navigate]);

    useEffect(() => {
        document.title += ' - Admin Panel'
    }, []);

    return (
        <div>
            <GoBackLink />

            {auth.admin && <div className="admin-panel pt-5 p-3">
                <Nav tabs>
                    <NavItem>
                        <NavLink active={isActive[0]} onClick={() => setActive(0)}>Users ({usersCount})</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink active={isActive[1]} onClick={() => setActive(1)}>Polls</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink active={isActive[2]} onClick={() => setActive(2)}>Templates</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink active={isActive[3]} onClick={() => setActive(3)}>Logs</NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId={0}>
                        <Users setUsersCount={setUsersCount} />
                    </TabPane>
                    <TabPane tabId={1}>
                        <h2>Polls</h2>
                    </TabPane>
                    <TabPane tabId={2}>
                        {/* <Link to={'/template/create'}><button>Create new template</button></Link> */}
                        <Templates />
                    </TabPane>
                    <TabPane tabId={3}>
                        <Logs />
                    </TabPane>
                </TabContent>
            </div>}
        </div>
    )
}

export default AdminPanel