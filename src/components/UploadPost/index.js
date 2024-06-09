import React, { useEffect, useState } from 'react';
import './style.scss';
import { useSelector } from 'react-redux';
import apiPost from '../../services/PostService';
import AlertSuccess from '../Alert/AlertSuccess';
import AlertError from '../Alert/AlertError';

function UploadPost() {
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState('');
    const [previewImages, setPreviewImages] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;

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
        if (files.length > 4) {
            alert.error('Chỉ có thể tải lên tối đa 4 ảnh');
            return;
        }

        setImages(files);
        setPreviewImages(files.map(file => URL.createObjectURL(file)));
    };

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
                <input type="file" accept="image/*" multiple onChange={handleImageChange} required />
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
        </div>
    );
}

export default UploadPost;
