import React from 'react'
import './FriendMessage.scss'

function FriendMessage({ id, image, name, newMessageBox }) {
    return (
        <div className='icon-mesage-friend'>
            <div className='mesage-friend-info'>
                <img src={image} alt='ảnh' />
                <p>{name}</p>
            </div>
            <div className='btn-add-messages'>
                <button onClick={() => newMessageBox(id)}><i className="fa-brands fa-facebook-messenger"></i></button>
            </div>
        </div>
    )
}

export default FriendMessage
