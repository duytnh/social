import React from 'react'
import { useNavigate } from 'react-router-dom';

function IconSended({ name, image, id }) {
    const navigate = useNavigate();
    const detailsUser = () => {
        localStorage.setItem('selectedPage', `details-user/${id}`);
        navigate(`/details-user/${id}`);
    }
    return (
        <div className='icon-sended'>
            <div className='sended-info' onClick={detailsUser}>
                <img src={image} alt='ảnh' />
                <p>{name}</p>
            </div>
            <div className='btn-sended'>
                <button><i className="fa-solid fa-hourglass-half"></i> Đã gửi yêu cầu</button>
            </div>
        </div>
    )
}

export default IconSended
