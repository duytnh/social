import React from 'react';
import './style.scss';

function ModalEdit({ name, bio, image, closeModalEdit, updateData, handleImageChange, onChangeName, onChangeBio }) {
    return (
        <div className='modal-edit'>
            <div className='modal-header'>
                <h5><i className="fa-solid fa-user-pen"></i> Cập nhật thông tin</h5>
                <button onClick={closeModalEdit}><i className="fa-solid fa-circle-xmark"></i></button>
            </div>
            <div className='modal-content'>
                <form className='modal-form' onSubmit={updateData}>
                    <img src={image} alt='ảnh profile' />
                    <input type='text' value={name} placeholder='Fullname...' required onChange={onChangeName} />
                    <input type='text' value={bio} placeholder='Bio...' onChange={onChangeBio} />
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    <button type='submit'>Cập nhật</button>
                </form>
            </div>
        </div>
    )
}

export default ModalEdit
