import './CreatePoll.css';
import { useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form';

export default function PollImage({ setPollImgFile }) {

    const inputRef = useRef();
    const [pollImage, setPollImage] = useState('/assets/images/upload.png');
    const { setValue } = useFormContext();

    const handlePollImageUploadFile = (event) => {
        if (event.target.files.length > 0) {
            const blob = URL.createObjectURL(event.target.files[0]);
            setValue('image_path', '');
            setPollImage(blob);
            setPollImgFile(event.target.files[0]);
        }
    }

    const handlePollImageDeleteFile = (e) => {
        e.preventDefault();
        setValue('image_path', '');
        setPollImage('/assets/images/upload.png');
        inputRef.current.value = '';
    }

    return (
        <div className='poll-image'>
            <label htmlFor="poll-img">
                {pollImage !== '/assets/images/upload.png' && (
                    <button className="delete-image-btn" onClick={(e) => handlePollImageDeleteFile(e)}>
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
                    accept='image/*'
                    id='poll-img'
                    style={{ display: 'none' }}
                    ref={inputRef}
                    onChange={(e) => { handlePollImageUploadFile(e) }}
                />
            </label>
        </div>
    )
}
