import React, { useEffect, useRef } from 'react';
import './style.scss';
import { useSelector } from 'react-redux';

function Messenger({ avatar_reciver, fullname_reciver, dataReceived, dataSent, sendMessage, closeMessage, onChangeInputMessage, message }) {
    const user = useSelector(state => state.auth.user);
    const userId = user && user.user_id;
    const allMessages = [...dataReceived, ...dataSent].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [allMessages]);

    return (
        <div className='messenger'>
            <div className='messenger-header'>
                <div className='header-info'>
                    <img src={avatar_reciver} alt='image messenger' />
                    <p>{fullname_reciver}</p>
                </div>
                <button onClick={closeMessage}><i className="fa-regular fa-circle-xmark"></i></button>
            </div>

            <div className='messenger-content'>
                {allMessages && allMessages.map((item, index) => {
                    const isSent = item.sender_id === userId;
                    const avatarSender = item.sender_avatar_url && item.sender_avatar_url.replace('../../', 'https://booksfacefake.000webhostapp.com/mediaBE/');
                    return (
                        <div className={isSent ? 'sender' : 'receiver'} key={index}>
                            {isSent ? (
                                <>
                                    {item.message ? (<p>{item.message}</p>) : ''}
                                    {avatarSender ? (<img src={avatarSender} alt='image sender' />) : ''}

                                </>
                            ) : (
                                <>
                                    {avatarSender ? (<img src={avatarSender} alt='image sender' />) : ''}
                                    {item.message ? (<p>{item.message}</p>) : ''}
                                </>
                            )}
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            <div className='messenger-footer'>
                <input onChange={(e) => onChangeInputMessage(e)} value={message} type='text' placeholder='Nhập nội dung...' required />
                <button onClick={sendMessage}><i className="fa-regular fa-paper-plane"></i></button>
            </div>
        </div>
    );
}

export default Messenger;
