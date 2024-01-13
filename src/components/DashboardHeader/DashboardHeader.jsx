import React, { useState } from 'react'
import './DashboardHeader.css'
import Search from '../Search/Search'
import Profile from '../Profile/Profile'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import useAuth from '../../hooks/useAuth';

export default function DashboardHeader() {
    const { auth } = useAuth();

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            {
                Object.entries(auth).length > 0 && <div className="dashboard-header">
                    <Navbar expand='md' className='py-0'>
                        <NavbarBrand href="/"><img className="logo" src="/assets/images/Polly_logo.svg" alt="Polly" /></NavbarBrand>
                        <NavbarToggler onClick={toggle} />
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="nav-links" navbar>
                                <NavItem>
                                    <Search />
                                </NavItem>
                                <NavItem>
                                    <Profile />
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            }
        </>
    );
}