import axios from "axios";

const countPostAndUser = async (token) => {
    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/analytics/countPostAndUser.php', {
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

const apiAnalytics = { countPostAndUser, countPostByUser, countLikeCommentPost, getAllPost };

export default apiAnalytics;