import React from 'react'
import './style.scss'

function ConfirmModal({ onClose, onConfirm, data }) {
    return (
        <div className="modal-confirm animate__animated animate__zoomIn">
            <h2 className='text-left'>Confirm Deletion</h2>
            <p className='text-center'>Are you sure you want to delete ?</p>
            <div className="modal-actions">
                <button onClick={onClose} className="btn-cancel">Cancel</button>
                <button onClick={() => onConfirm(data)} className="btn-confirm">Delete</button>
            </div>
        </div>
    );
}

export default ConfirmModal
