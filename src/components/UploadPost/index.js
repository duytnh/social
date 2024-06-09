import React, { useEffect, useState, useRef, useCallback } from 'react';
import './style.scss';
import { useSelector } from 'react-redux';
import Webcam from 'react-webcam';
import apiPost from '../../services/PostService';
import AlertSuccess from '../Alert/AlertSuccess';
import AlertError from '../Alert/AlertError';

function UploadPost() {
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState('');
    const [previewImages, setPreviewImages] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [cameraActive, setCameraActive] = useState(false);
    const [facingMode, setFacingMode] = useState('user');

    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;

    const webcamRef = useRef(null);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                window.location.reload();
                setMessage('');
            }, 1500);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                setError('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, error]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + images.length > 4) {
            setError('Chỉ có thể tải lên tối đa 4 ảnh');
            return;
        }

        const newImages = [...images, ...files];
        setImages(newImages);
        setPreviewImages(newImages.map(file => URL.createObjectURL(file)));
    };

    const handleCapture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        fetch(imageSrc)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
                const newImages = [...images, file];
                if (newImages.length > 4) {
                    setError('Chỉ có thể tải lên tối đa 4 ảnh');
                    return;
                }
                setImages(newImages);
                setPreviewImages(newImages.map(file => URL.createObjectURL(file)));
            });
    }, [images]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        images.forEach((image, index) => {
            formData.append('images[]', image);
        });
        formData.append('description', description);
        formData.append('token', token);

        try {
            const response = await apiPost.uploadPost(formData);
            if (response.data.status === 200) {
                setMessage(response.data.message);
                setImages([]);
                setPreviewImages([]);
            } else if (response.data.status === 400 || response.data.status === 500) {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    };

    const toggleCamera = () => {
        setFacingMode(prevMode => (prevMode === 'user' ? 'environment' : 'user'));
    };

    return (
        <div className="upload-image-container">
            <h4>Tải lên bài viết</h4>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder="Hôm nay bạn thế nào ?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input type="file" accept="image/*" multiple onChange={handleImageChange} />
                <div className={`preview-images layout-${previewImages.length}`}>
                    {previewImages.map((src, index) => (
                        <div key={index} className="preview-image">
                            <img src={src} alt={`Preview ${index}`} />
                        </div>
                    ))}
                </div>
                <button type="submit"><i className="fa-solid fa-cloud-arrow-up"></i> Tải ảnh lên</button>
            </form>

            {message && (<AlertSuccess message={message} />)}
            {error && (<AlertError message={error} />)}

            <button className='on-camera' onClick={() => setCameraActive(true)}>
                <i className="fa-solid fa-camera"></i>
            </button>

            <div className="camera-container">
                {cameraActive && (
                    <div className='camera'>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{ facingMode }}
                        />
                        <center><button className='capture' onClick={handleCapture}><i className="fa-regular fa-circle-dot"></i></button></center>
                        <button className='off-camera' onClick={() => setCameraActive(false)}><i className="fa-solid fa-power-off"></i></button>
                        <button className='toggle-camera' onClick={toggleCamera}><i className="fa-solid fa-camera-rotate"></i></button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UploadPost;
