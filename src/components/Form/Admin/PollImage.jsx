import React, { useState } from 'react'
import './CSS/AdminForm.css'

export default function PollImage() {

    const [pollImage, setPollImage] = useState('/assets/images/upload.png');

    return (

        <div className='form-image'>
            <label htmlFor="form-img">
                <img
                    src={pollImage}
                    alt="PollImage"
                />
            </label>
            <input
                type="file"
                accept='image/png, image/pjpeg, image/svg+xml'
                id='form-img'
                style={{ display: 'none' }}
                onChange={(e) => {
                    if (e.target.files.length > 0) {
                        setPollImage(URL.createObjectURL(e.target.files[0]));
                    }
                }}
            />
        </div>
    )
}