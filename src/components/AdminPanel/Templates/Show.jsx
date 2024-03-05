import React from 'react'

const Show = ({ show }) => {
    
    return (
        <div className='d-flex'>
            <img src={`/assets/images/${(show) ? 'check_mark' : 'close_mark'}.svg`} alt="show" className='show' />
        </div>
    )
}

export default Show