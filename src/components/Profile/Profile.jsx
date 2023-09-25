import './Profile.css'
import axios from '../../api/axios';
import React, { useEffect, useRef, useState } from 'react';
import ProfileMenu from './ProfileMenu';
import useAuth from '../../hooks/useAuth';

export default function Profile() {

  const inputRef = useRef();
  const { auth, setAuth } = useAuth();
  const [profilePic, setProfilePic] = useState('');

  const uploadProfilePicture = async (event) => {
    if (event.target.files.length > 0) {
      const profilePictureFile = event.target.files[0];
      const formData = new FormData();
      formData.append(`${auth?.userId}`, profilePictureFile);
      try {
        setAuth(prev => {
          return { ...prev, profile_pic_path: undefined }
        });
        const response = await axios.post('/users/upload', formData, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`
          },
          withCredentials: true
        });
        setAuth(prev => {
          return { ...prev, profile_pic_path: response.data.imgPath }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  const removeProfilePicture = async () => {
    try {
      await axios.post(`/users/remove_profile_pic`, { profile_pic_path: auth.profile_pic_path }, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        },
        withCredentials: true
      });
      setAuth(prev => {
        return { ...prev, profile_pic_path: undefined }
      })
    } catch (err) {
      console.log(err);
    }
    inputRef.current.value = '';
  }

  useEffect(() => {
    if (auth.profile_pic_path) {
      axios.get(auth.profile_pic_path)
        .then(res => setProfilePic(res.request.responseURL))
        .catch(() => setProfilePic('/assets/images/ProfilePicMockup.svg'));
    } else {
      setProfilePic('/assets/images/ProfilePicMockup.svg')
    }
  }, [auth])

  return (
    <div className='dashboard-profile'>
      <label htmlFor="profile_img">
        <img
          src={profilePic}
          alt="Profile"
        />
        <input
          ref={inputRef}
          type="file"
          accept='image/png, image/pjpeg, image/bmp, image/svg+xml'
          id='profile_img'
          style={{ display: 'none' }}
          onChange={(e) => uploadProfilePicture(e)}
        />
      </label>
      <ProfileMenu removeProfilePicture={removeProfilePicture} />
    </div>
  )
}