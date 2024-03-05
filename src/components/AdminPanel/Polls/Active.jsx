import React from 'react'

const Active = ({ active }) => {
    
    return (
        <div className='d-flex'>
            <img src={`/assets/images/${(active) ? 'check_mark' : 'close_mark'}.svg`} alt="active" className='active w-50' />
        </div>
    )
}

export default Active