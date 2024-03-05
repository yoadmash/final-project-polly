import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'
import { AdminPanelProvider } from '../../contexts/AdminPanelProvider';
import useAuth from '../../hooks/useAuth';
import GoBackLink from '../Layout/GoBackLink'
import Users from './Users/Users';
import Polls from './Polls/Polls';
import Templates from './Templates/Templates';
import Logs from './Logs/Logs';
import './AdminPanel.css';

const AdminPanel = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchParamsObj = Object.fromEntries(searchParams);

    const { auth } = useAuth();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('');
    const [usersCount, setUsersCount] = useState(0);
    const [pollsCount, setPollsCount] = useState(0);
    const [templatesCount, setTemplatesCount] = useState(0);

    const setActive = (title) => {
        setActiveTab(title);
        setSearchParams({ tab: title });
    }

    useEffect(() => {
        if (!auth.admin) {
            navigate('/');
        }
    }, [auth, navigate]);

    useEffect(() => {
        document.title = `Polly - Admin Panel`
    }, []);

    useEffect(() => {
        if (activeTab !== searchParamsObj.tab) {
            setActiveTab(searchParamsObj.tab);
        }
    }, [activeTab, searchParamsObj]);

    const tabs = [
        { title: 'users', element: <Users setUsersCount={setUsersCount} />, count: usersCount },
        { title: 'polls', element: <Polls setPollsCount={setPollsCount} />, count: pollsCount },
        { title: 'templates', element: <Templates setTemplatesCount={setTemplatesCount} />, count: templatesCount },
        { title: 'logs', element: <Logs /> },
    ]

    const capitalLetter = (string) => string = string.charAt(0).toUpperCase() + string.slice(1);

    return (
        <div>
            <GoBackLink />

            {auth.admin && <div className="admin-panel pt-5 p-3">
                <Nav tabs>
                    {tabs.map((tab, index) => {
                        const active = tab.title === activeTab;
                        return (
                            <NavItem key={index}>
                                <NavLink active={active} onClick={() => setActive(tab.title)}>
                                    {capitalLetter(tab.title)} {tab.count >= 0 && active && `(${tab.count})`}
                                </NavLink>
                            </NavItem>
                        )
                    })}
                </Nav>
                <AdminPanelProvider>
                    <TabContent activeTab={activeTab}>
                        {tabs.map((tab, index) =>
                            <TabPane
                                key={index}
                                tabId={tab.title}
                            >{tab.element}</TabPane>
                        )}
                    </TabContent>
                </AdminPanelProvider>
            </div>}
        </div>
    )
}

export default AdminPanel