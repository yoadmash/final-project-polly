import './CreatePoll.css';
import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form';

export default function PollImage({ setPollImgFile, setDeletePollImageOnEdit, editMode }) {

    const inputRef = useRef();
    const [pollImage, setPollImage] = useState('/assets/images/upload.png');
    const { setValue, getValues } = useFormContext();
    const image_path = getValues('image_path');

    const handlePollImageUploadFile = (event) => {
        if (event.target.files.length > 0) {
            const blob = URL.createObjectURL(event.target.files[0]);
            setValue('image_path', '');
            setPollImage(blob);
            setPollImgFile(event.target.files[0]);
            if (editMode) {
                setDeletePollImageOnEdit(false);
            }
        }
    }

    const handlePollImageDeleteFile = (e) => {
        e.preventDefault();
        if (editMode && getValues().image_path.length > 0) {
            setDeletePollImageOnEdit(true);
        }
        setValue('image_path', '');
        setPollImgFile('');
        setPollImage('/assets/images/upload.png');
        inputRef.current.value = '';
    }

    useEffect(() => {
        if (editMode && image_path?.length > 0) {
            setPollImage('http://localhost:3500' + image_path);
        }
    }, [editMode, image_path]);

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
