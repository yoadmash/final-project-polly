import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function GoBackLink({to}) {
  const navigate = useNavigate();

  const goBack = (e) => {
    e.preventDefault();
    navigate(to || '/');
  }

  return (
    <div className='go-back'>
      <button onClick={(e) => goBack(e)}>{'< Back'}</button>
    </div>
  )
}
