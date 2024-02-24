import React from 'react'
import ProfilePic from './ProfilePic';
import Active from './Active';
import Actions from './Actions';

const User = ({ user, setUser, setModal }) => {
    const props = ['profile_pic_path', 'active', 'username', 'email', 'firstname', 'registered_at', 'actions'];

    const returnFullName = (firstname, lastname) => {
        firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1);
        lastname = lastname.charAt(0).toUpperCase() + lastname.slice(1);
        return (firstname === lastname) ? firstname : `${firstname} ${lastname}`;
    }

    return (
        <tr>
            {props.map((prop, index) => {
                let data = undefined;
                switch (prop) {
                    case "profile_pic_path":
                        data = <ProfilePic src={user.profile_pic_path} admin={user.admin} />
                        break;
                    case "firstname":
                        data = returnFullName(user.firstname, user.lastname);
                        break;
                    case "active":
                        data = <Active active={user.active} setModal={setModal} />
                        break;
                    case "actions":
                        data = <Actions user={user} setUser={setUser} setModal={setModal} />
                        break;
                    default:
                        data = String(user[prop]);
                        break;
                }
                return <td key={index} className='align-middle p-2'>{data}</td>
            })}
        </tr>
    )
}

export default User