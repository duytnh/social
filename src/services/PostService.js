import axios from "axios";

const uploadPost = async (formData) => {
    const response = await axios.post('https://booksfacefake.000webhostapp.com/mediaBE/api/posts/uploadPost.php', formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    return response;
}

const likePost = async (post_id, token, action) => {
    const response = await axios.post('https://booksfacefake.000webhostapp.com/mediaBE/api/posts/likePost.php', {
        post_id: post_id,
        access_token: token,
        action: action
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return response;
}

const commentPost = async (post_id, token, action, comment = null, comment_id = null) => {
    const data = {
        access_token: token,
        action: action,
        ...(action === 'add' && { post_id: post_id, comment: comment }),
        ...(action === 'delete' && { comment_id: comment_id })
    };

    const response = await axios.post('https://booksfacefake.000webhostapp.com/mediaBE/api/posts/commentPost.php', data,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    );

    return response;
};


const deletePost = async (post_id, token) => {
    const response = await axios.post('https://booksfacefake.000webhostapp.com/mediaBE/api/posts/deletePost.php', {
        post_id: post_id,
        access_token: token
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return response;
}

const getAllPost = async (token) => {
    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/posts/getAllPost.php', {
        params: {
            access_token: token,
        }
    });
    return response;
}

const getAllPostByUser = async (token, user_id = '') => {
    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/posts/getAllPostByUser.php', {
        params: {
            access_token: token,
            user_id: user_id
        }
    });
    return response;
}

const getNotify = async (token) => {
    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/posts/getNotify.php', {
        params: {
            access_token: token,
        }
    });
    return response;
}

const readNotify = async (id) => {
    const response = await axios.post('https://booksfacefake.000webhostapp.com/mediaBE/api/posts/updateNotify.php', {
        notification_id: id
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return response;
}

const getDetailsPost = async (token, id) => {
    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/posts/getDetailsPost.php', {
        params: {
            access_token: token,
            post_id: id
        }
    });
    return response;
}

const apiPost = { uploadPost, likePost, commentPost, deletePost, getAllPost, getAllPostByUser, getNotify, readNotify, getDetailsPost };

export default apiPost;

