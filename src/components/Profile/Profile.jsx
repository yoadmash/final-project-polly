import './Profile.css'
import axios from '../../api/axios';
import React, { useEffect, useRef, useState } from 'react';
import ProfileMenu from './ProfileMenu';
import useAuth from '../../hooks/useAuth';
import ReactLoading from 'react-loading';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export default function Profile() {

  const inputRef = useRef();
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useAuth();
  const [profilePic, setProfilePic] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const uploadProfilePicture = async (event) => {
    if (event.target.files.length > 0) {
      const profilePictureFile = event.target.files[0];
      const formData = new FormData();
      formData.append(`${auth?.userId}`, profilePictureFile);
      try {
        setIsLoading(true);
        setAuth(prev => ({ ...prev, profile_pic_path: '' }));
        const response = await axiosPrivate.post('/users/upload', formData);
        setAuth(prev => ({ ...prev, profile_pic_path: response.data.imgPath }));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    }
  }

  const removeProfilePicture = async () => {
    try {
      setIsLoading(true);
      await axiosPrivate.post(`/users/remove_profile_pic`, { profile_pic_path: auth.profile_pic_path });
      setAuth(prev => ({ ...prev, profile_pic_path: '' }));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (auth.profile_pic_path) {
      setIsLoading(true);
      axios.get(auth.profile_pic_path)
        .then(res => {
          setProfilePic(res.request.responseURL);
          setIsLoading(false);
        })
        .catch(() => {
          setProfilePic('/assets/images/ProfilePicMockup.svg')
          setIsLoading(false);
        });
    } else {
      setProfilePic('/assets/images/ProfilePicMockup.svg');
    }
  }, [auth])

  return (
    <div className='dashboard-profile'>
      {isLoading
        ? <ReactLoading type='spin' color='#000000' className='loader' style={{}}/>
        :
        <label htmlFor="profile_img">
          <img
            style={{ border: (!auth.profile_pic_path ? 'none' : '') }}
            src={profilePic}
            alt="Profile"
          />
          <input
            ref={inputRef}
            type="file"
            accept='image/*'
            id='profile_img'
            style={{ display: 'none' }}
            onChange={(e) => uploadProfilePicture(e)}
          />
        </label>}
      <ProfileMenu removeProfilePicture={removeProfilePicture} />
    </div>
  )
}