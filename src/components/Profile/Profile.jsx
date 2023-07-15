import React, { useState } from 'react'
import './Profile.css'

export default function Profile() {

  const [profilePic, setProfilePic] = useState('/assets/images/ProfilePicMockup.svg');

  return (
    <div className='dashboard-profile'>
      <label htmlFor="profile_img">
        <img
          src={profilePic}
          alt="Profile"
        />
      </label>
      <input
        type="file"
        accept='image/png, image/pjpeg, image/svg+xml'
        id='profile_img'
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files.length > 0) {
            setProfilePic(URL.createObjectURL(e.target.files[0]));
          }
        }}
      />
      <p>Logout</p>
    </div>
  )
}