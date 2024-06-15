import React from 'react'
import './style.scss'

function IconMessage({ id, fullname, avatar, onOpenMessage }) {
    return (
        <div className='messages'>
            <div className='icon-message'>
                <div className='icon-info'>
                    <img src={avatar} alt='image icon mesage' />
                    <p>{fullname}</p>
                </div>
                <button onClick={() => onOpenMessage(id)}><i className="fa-brands fa-facebook-messenger"></i></button>
            </div>
            <hr></hr>

        </div>
    )
}

export default IconMessage
