import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';
import "./Image_Uploading.css";

export function Image_Upload_Function() {
    const [image, setImage] = useState(null);
    const maxNumber = 1;

    const onChange = (imageList) => {
        setImage(imageList[0] || null);
    };

    return (
        <div className="App">
            <ImageUploading
                value={image ? [image] : []}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    <div className="upload__image-wrapper">
                        {image ? (
                            <div className="image-item">
                                <img className="image-css" src={image['data_url']} alt="" width="100" />
                                <div className="image-item__btn-wrapper">
                                    <button onClick={() => onImageUpdate(0)}>Update</button>
                                    <button onClick={() => onImageRemove(0)}>X</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <button className='button-tumb'
                                    style={isDragging ? { color: 'red'  } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    <img className="upload-tumb" src='UploadImg.png' />
                                </button>
                                {/* <button onClick={onImageRemoveAll}>Remove image</button> */}
                            </>
                        )}
                    </div>
                )}
            </ImageUploading>
        </div>
    );
}