import React from 'react'

const ProfilePic = ({ src, admin }) => {
    return (
        <div className='p-2'>
            <img src={src || '/assets/images/ProfilePicMockup.svg'} alt="profile" className='profile-pic' />
            {admin && <img src='/assets/images/crown.svg' alt="crown" className='admin-badge' title='Admin'/>}
        </div>
    )
}

export default ProfilePic