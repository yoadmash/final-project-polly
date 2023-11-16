import './Profile.css'
import axios from '../../api/axios';
import React, { useEffect, useRef, useState } from 'react';
import ProfileMenu from './ProfileMenu';
import useAuth from '../../hooks/useAuth';
import ReactLoading from 'react-loading';

export default function Profile() {

  const inputRef = useRef();
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
        setAuth(prev => ({ ...prev, profile_pic_path: undefined }));
        const response = await axios.post('/users/upload', formData, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`
          },
          withCredentials: true
        });
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
      await axios.post(`/users/remove_profile_pic`, { profile_pic_path: auth.profile_pic_path }, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        },
        withCredentials: true
      });
      setAuth(prev => ({ ...prev, profile_pic_path: undefined }));
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
    inputRef.current.value = '';
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
      <label htmlFor="profile_img">
        {isLoading
          ? <ReactLoading type='spin' color='#000000' />
          :
          <img
            style={{ border: (!auth.profile_pic_path ? 'none' : '') }}
            src={profilePic}
            alt="Profile"
          />
        }
        <input
          ref={inputRef}
          type="file"
          accept='image/*'
          id='profile_img'
          style={{ display: 'none' }}
          onChange={(e) => uploadProfilePicture(e)}
        />
      </label>
      <ProfileMenu removeProfilePicture={removeProfilePicture} />
    </div>
  )
}