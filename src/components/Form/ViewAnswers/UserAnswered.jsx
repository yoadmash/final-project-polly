import React, { useEffect, useState } from 'react'
import useAxiosPricate from '../../../hooks/useAxiosPrivate';
import './ViewAnswers.css';

const UserAnswered = ({ user_data, setUserAnswers }) => {

    const axiosPrivate = useAxiosPricate();
    const [userProfilePic, setUserProfilePic] = useState('/assets/images/ProfilePicMockup.svg');

    const getUserProfilePic = async () => {
        try {
            const response = await axiosPrivate.get(`/users/${user_data.user_id}`);
            response.data.foundUser?.profile_pic_path?.length > 0
            ? setUserProfilePic(`http://localhost:3500${response.data.foundUser.profile_pic_path}`)
            : setUserProfilePic('/assets/images/ProfilePicMockup.svg');
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUserProfilePic();
    })

    return (
        <div className='users-list-item d-flex align-items-center gap-3' onClick={() => setUserAnswers(user_data.user_id)}>
            <img src={userProfilePic} alt={user_data.user_name} className='user-profile-pic' />
            <p>{user_data.user_name}</p>
        </div>
    )
}

export default UserAnswered