import React from 'react'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const Actions = ({ user, setUser, setModal }) => {

    const axiosPrivate = useAxiosPrivate();

    const actions = [
        { title: "View polls", icon_src: '/assets/images/view_answers.svg', action: 'view-polls' },
        { title: `${user.admin ? "Remove admin" : "Set admin"}`, icon_src: `${user.admin ? '/assets/images/ProfilePicMockup.svg' : '/assets/images/crown-black.svg'}`, action: 'set-admin' },
        { title: `${user.active ? "Deactivate" : "Activate"}`, icon_src: `${user.active ? '/assets/images/deactivate.svg' : '/assets/images/activate.svg'}`, action: 'set-active' },
        { title: "Reset password", icon_src: '/assets/images/reset-pass.svg', action: 'send-reset-password-email' },
        { title: "Remove profile picture", icon_src: '/assets/images/remove-profile-pic.svg', action: 'remove-profile-pic' },
    ]

    const setActive = async (status) => {
        try {
            await axiosPrivate.post(`/users/set_active?state=${Number(status)}&by_admin=true`, { userId: user._id });
        } catch (err) {
            console.log(err);
        }
    }

    const setAdmin = async () => {
        try {
            await axiosPrivate.post('/users/set_admin', { userId: user._id });
        } catch (err) {
            console.log(err);
        }
    }

    const sendResetPasswordEmail = async (emailAddress) => {
        try {
            await axiosPrivate.post('/users/auth/reset-password', { emailAddress });
        } catch (err) {
            console.log(err);
        }
    }

    const removeUserProfilePic = async (userId) => {
        try {
            await axiosPrivate.post('/users/remove_profile_pic', { by_admin: true, userId });
        } catch (err) {
            console.log(err);
        }
    }

    const preformAction = async (action) => {
        switch (action) {
            case 'view-polls':
                setModal({ state: true, user });
                break;
            case 'set-admin':
                user.admin = !user.admin;
                setAdmin();
                setUser(user._id, user);
                break;
            case 'set-active':
                user.active = !user.active;
                setActive(user.active);
                setUser(user._id, user);
                break;
            case 'send-reset-password-email':
                sendResetPasswordEmail(user.email);
                break;
            case 'remove-profile-pic':
                removeUserProfilePic(user._id);
                user.profile_pic_path = '';
                setUser(user._id, user);
                break;
            default:
                break;
        }
    }

    return (
        <ul>
            {actions.map((item, index) => (
                <li
                    key={index}
                    title={item.title}
                    onClick={() => preformAction(item.action)}
                >
                    <img
                        className='actions'
                        src={item.icon_src}
                        alt={item.title}
                    />
                </li>
            ))}
        </ul>
    )
}

export default Actions