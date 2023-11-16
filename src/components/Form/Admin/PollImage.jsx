import React, { useRef, useState } from 'react'
import './CSS/AdminForm.css';
import { Row } from 'reactstrap';

export default function PollImage() {

    const inputRef = useRef();
    const [pollImage, setPollImage] = useState('/assets/images/upload.png');

    const handleImageDelete = () => {
        inputRef.current.value = '';
        setPollImage('/assets/images/upload.png');
    }

    return (
        <div className='form-image'>
            {pollImage !== '/assets/images/upload.png' && (
                <button className="delete-image-btn" onClick={handleImageDelete}>
                    <img src='/assets/images/remove_question.svg' alt="Delete" />
                </button>
            )}
            <Row>
                <div >
                    <label htmlFor="form-img">
                        <img
                            src={pollImage}
                            alt="PollImage"
                        />
                    </label>

                </div>
                <input
                    type="file"
                    accept='image/png, image/pjpeg, image/svg+xml'
                    id='form-img'
                    style={{ display: 'none' }}
                    ref={inputRef}
                    onChange={(e) => {
                        if (e.target.files.length > 0) {
                            setPollImage(URL.createObjectURL(e.target.files[0]));
                        }
                    }}
                />
            </Row>
        </div>
    )
}