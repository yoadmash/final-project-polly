import React from 'react'

const UserItem = ({ user_data, setAsOwner }) => {

    return (
        <div className='users-list-item d-flex align-items-center gap-3' onClick={() => setAsOwner(user_data)}>
            <img src={user_data.profile_pic_path || '/assets/images/ProfilePicMockup.svg'} alt={user_data.user_name} className='user-profile-pic' />
            <p>{user_data.user_name}</p>
        </div>
    )
}

export default UserItem