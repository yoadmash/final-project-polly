import React from 'react';
import { Link } from 'react-router-dom';

const MissingPage = () => {

    const style = {
        position: 'relative',
        top: '80px'
    }

    return (
        <div style={style} className='d-flex justify-content-center align-items-center flex-column m-5'>
            <h1>404 not found</h1>
            <Link to={'/'}><p>Go Home</p></Link>
        </div>
    )
}

export default MissingPage