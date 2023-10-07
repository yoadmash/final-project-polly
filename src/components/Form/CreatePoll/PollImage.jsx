import './CreatePoll.css';
import { useEffect } from 'react';
import { useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form';

export default function PollImage() {
    const { setValue } = useFormContext();

    const inputRef = useRef();
    const [pollImage, setPollImage] = useState('/assets/images/upload.png');

    const handleImageDelete = (e) => {
        e.preventDefault();
        setValue('image_path', '');
        setPollImage('/assets/images/upload.png');
        inputRef.current.value = '';
    }

    useEffect(() => {
        setValue('image_path', '');
    }, [setValue]);

    return (
        <div className='poll-image'>
            <label htmlFor="poll-img">
                {pollImage !== '/assets/images/upload.png' && (
                    <button className="delete-image-btn" onClick={(e) => handleImageDelete(e)}>
                        <img src='/assets/images/remove_question.svg' alt="Delete" />
                    </button>
                )}
                <img
                    className={pollImage !== '/assets/images/upload.png' ? 'shadow' : ''}
                    src={pollImage}
                    alt="PollImage"
                />
                <input
                    type="file"
                    accept='image/png, image/pjpeg, image/svg+xml'
                    id='poll-img'
                    style={{ display: 'none' }}
                    ref={inputRef}
                    onChange={(e) => {
                        if (e.target.files.length > 0) {
                            const blob = URL.createObjectURL(e.target.files[0]);
                            setValue('image_path', blob);
                            setPollImage(blob);
                        }
                    }}
                />
            </label>
        </div>
    )
}
