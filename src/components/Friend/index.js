import React from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';

function IconFriend({ image, name, id }) {
    const navigate = useNavigate();
    const detailsUser = () => {
        localStorage.setItem('selectedPage', `details-user/${id}`);
        navigate(`/details-user/${id}`);
    }
    return (
        <div className='friends' onClick={detailsUser}>
            <img src={image} alt='ảnh' />
            <p>{name}</p>
        </div>
    )
}

export default IconFriend
