import React from 'react'
import './style.scss'

function Notification({ name, image, created, message, isRead, detailsPost }) {
    return (
        <div className={`notify-box ${isRead === 1 ? 'unread' : ''}`} onClick={detailsPost}>
            <img src={image} alt='Ảnh người thông báo' />
            <div className='notify-content'>
                <h6>{name}</h6>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Notification
