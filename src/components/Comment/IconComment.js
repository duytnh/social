import React from 'react';
import './style.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function IconComment({ avatar, name, created, content, userid, comment_id, handleDeleteComment }) {
    const user = useSelector(state => state.auth.user);
    const image_cmt = avatar && avatar.replace('../../', 'https://booksfacefake.000webhostapp.com/mediaBE/');

    const navigate = useNavigate();
    const detailsUser = () => {
        localStorage.setItem('selectedPage', `details-user/${userid}`);
        navigate(`/details-user/${userid}`);
    }
    return (
        <div className='icon-comment'>
            <div className='info-comment' onClick={detailsUser}>
                <img src={image_cmt} alt='Ảnh user comment' />
                <div className='auth-comment'>
                    <h6>{name}</h6>
                    <p>{created}</p>
                </div>
            </div>
            <div className='content-comment'>
                <p>{content}</p>
                {user && user.user_id === Number(userid) && (
                    <button onClick={() => handleDeleteComment(comment_id)}>
                        <i className="fa-regular fa-trash-can"></i>
                    </button>
                )}
            </div>
        </div>
    )
}

export default IconComment;
