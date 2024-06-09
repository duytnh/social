import React from 'react';
import './style.scss';

function ImageModal({ isOpen, imageSrc, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-image" onClick={e => e.stopPropagation()}>
                <img src={imageSrc} alt="Modal Content" />
                <button className="close-button" onClick={onClose}><i className="fa-solid fa-circle-xmark"></i></button>
            </div>
        </div>
    );
}

export default ImageModal;
