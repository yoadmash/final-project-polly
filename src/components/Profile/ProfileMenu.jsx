import React, { useState } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import useAuth from '../../hooks/useAuth';
import useLogout from '../../hooks/useLogout';
import useDeactivate from '../../hooks/useDeactivate';
import { useNavigate } from 'react-router-dom';

function ProfileMenu({ removeProfilePicture }) {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { auth } = useAuth();
    const logout = useLogout();
    const deactivate = useDeactivate();
    const navigate = useNavigate();

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const action = async (name) => {
        switch (name) {
            case 'signout':
                await logout();
                navigate('/auth');
                break;
            case 'deactivate':
                await deactivate();
                navigate('/auth');
                break;
            default:
                console.log('does nothing for now');
                break;
        }
    }


    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={'down'}>
            <DropdownToggle caret>{auth.fullname}</DropdownToggle>
            <DropdownMenu>
                {auth.profile_pic_path && <DropdownItem onClick={() => removeProfilePicture()}>Remove Picture</DropdownItem>}
                <DropdownItem onClick={() => action('deactivate')}>Deactivate</DropdownItem>
                <DropdownItem divider></DropdownItem>
                <DropdownItem onClick={() => action('signout')}>Logout</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default ProfileMenu;