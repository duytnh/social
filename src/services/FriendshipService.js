import axios from "axios";

const friend = async (friend_id, token, action) => {
    const response = await axios.post('https://booksfacefake.000webhostapp.com/mediaBE/api/friendships/friend.php', {
        friend_id: friend_id,
        access_token: token,
        action: action
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return response;
}

const getAllFriend = async (token, user_id = null, limit = null, page = null) => {
    const params = { access_token: token };

    if (user_id !== null) params.user_id = user_id;
    if (limit !== null) params.limit = limit;
    if (page !== null) params.page = page;

    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/friendships/getAllFriend.php', { params });
    return response;
}



const getSendFriend = async (token) => {
    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/friendships/getSendFriend.php', {
        params: {
            access_token: token
        }
    });
    return response;
}

const apiFriendships = { friend, getAllFriend, getSendFriend };

export default apiFriendships;