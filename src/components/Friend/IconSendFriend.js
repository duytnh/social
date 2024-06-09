import React from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';

function IconSendFriend({ name, image, id, acceptFriend, rejectFriend }) {
    const navigate = useNavigate();
    const detailsUser = () => {
        localStorage.setItem('selectedPage', `details-user/${id}`);
        navigate(`/details-user/${id}`);
    }
    return (
        <div className='icon-send-friend'>
            <div className='send-friend-info' onClick={detailsUser}>
                <img src={image} alt='ảnh' />
                <p>{name}</p>
            </div>
            <div className='btn-send-friend'>
                <button onClick={() => acceptFriend(id)}><i className="fa-solid fa-user-check"></i></button>
                <button onClick={() => rejectFriend(id)}><i className="fa-solid fa-user-xmark"></i></button>
            </div>
        </div>
    )
}

export default IconSendFriend
