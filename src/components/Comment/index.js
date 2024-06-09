import React from 'react'
import IconComment from './IconComment'

function Comment({ avatar_url, fullname, created_at, comment, id_user_comment, idComment, deleteComment }) {
    return (
        <div className='comments'>
            <div className='list-comment'>
                <IconComment
                    avatar={avatar_url}
                    name={fullname}
                    created={created_at}
                    content={comment}
                    userid={id_user_comment}
                    handleDeleteComment={deleteComment}
                    comment_id={idComment}
                />
            </div>
        </div>
    )
}

export default Comment
