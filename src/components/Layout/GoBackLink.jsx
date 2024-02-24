import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function GoBackLink() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className='go-back'>
      <button onClick={() => goBack()}>{'< Back'}</button>
    </div>
  )
}
