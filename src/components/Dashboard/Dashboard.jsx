import React from 'react'
import './Dashboard.css'
import DashboardHeader from '../DashboardHeader/DashboardHeader'
import DashboardBody from '../DashboardBody/DashboardBody'

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <DashboardHeader />
      <DashboardBody />
    </div>
  )
}