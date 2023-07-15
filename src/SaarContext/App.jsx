import React from 'react'
import './App.css'
import BookList from './store/Comps/BookList'
import PersonList from './store/Comps/PersonList'
import BuyForm from './store/Comps/BuyForm'

export default function App() {
  return (
    <div className='mainApp'>
      <section className='content'>
        <h1>React Context API Task</h1>
        <BookList />
        <PersonList />
        <BuyForm />
      </section>
    </div>
  )
}
