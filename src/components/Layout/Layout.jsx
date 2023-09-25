import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardHeader from '../DashboardHeader/DashboardHeader';

export default function Layout() {
    return (
        <div className='App'>
            <DashboardHeader />
            <Outlet />
        </div>
    )
}