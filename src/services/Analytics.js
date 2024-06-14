import axios from "axios";

const countPostAndUser = async (token) => {
    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/analytics/countPostAndUser.php', {
        params: {
            access_token: token,
        }
    });
    return response;
}

const count = async (token) => {
    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/analytics/count.php', {
        params: {
            access_token: token,
        }
    });
    return response;
}

const countPostByUser = async (token) => {
    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/analytics/countPostByUser.php', {
        params: {
            access_token: token,
        }
    });
    return response;
}

const countLikeCommentPost = async (token) => {
    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/analytics/countLikeCommentPost.php', {
        params: {
            access_token: token,
        }
    });
    return response;
}

const getAllPost = async (token) => {
    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/analytics/getAllPost.php', {
        params: {
            access_token: token,
        }
    });
    return response;
}

const getAllUser = async (token) => {
    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/analytics/getAllUser.php', {
        params: {
            access_token: token,
        }
    });
    return response;
}

const getAllLike = async (token) => {
    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/analytics/getAllLike.php', {
        params: {
            access_token: token,
        }
    });
    return response;
}

const getAllComment = async (token) => {
    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/analytics/getAllComment.php', {
        params: {
            access_token: token,
        }
    });
    return response;
}

const getAllNotify = async (token) => {
    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/analytics/getAllNotify.php', {
        params: {
            access_token: token,
        }
    });
    return response;
}

const deleteLikeComment = async (id, token, action) => {
    const response = await axios.post('https://booksfacefake.000webhostapp.com/mediaBE/api/analytics/deleteLikeComment.php', {
        idDelete: id,
        access_token: token,
        action: action
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return response;
}

const deleteNotify = async (id, token) => {
    const response = await axios.post('https://booksfacefake.000webhostapp.com/mediaBE/api/analytics/deleteNotify.php', {
        idDelete: id,
        access_token: token
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return response;
}

const apiAnalytics = {
    countPostAndUser,
    countPostByUser,
    countLikeCommentPost,
    getAllPost,
    getAllUser,
    getAllLike,
    getAllComment,
    getAllNotify,
    deleteLikeComment,
    deleteNotify,
    count
};

export default apiAnalytics;