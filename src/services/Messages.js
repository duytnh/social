import axios from "axios";

const getFriendMessage = async (token) => {
    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/messages/getFriendMessage.php', {
        params: {
            access_token: token,
        }
    });
    return response;
}

const getMessage = async (token, friend_id) => {
    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/messages/getMessage.php', {
        params: {
            access_token: token,
            friend_id: friend_id
        }
    });
    return response;
}

const countMessage = async (token) => {
    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/messages/countMessage.php', {
        params: {
            access_token: token
        }
    });
    return response;
}

const countReceiveAndSendMessage = async (token, idReceiver) => {
    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/messages/countReceiveAndSendMessage.php', {
        params: {
            access_token: token,
            receiver_id: idReceiver
        }
    });
    return response;
}

const getAllMessage = async (token) => {
    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/messages/getAllMessage.php', {
        params: {
            access_token: token
        }
    });
    return response;
}

const sendMessage = async (token, receiver_id, message) => {
    const response = await axios.post('https://booksfacefake.000webhostapp.com/mediaBE/api/messages/sendMessage.php', {
        receiver_id: receiver_id,
        message: message,
        access_token: token
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return response;
}

const deleteMessage = async (token, sender_id, receiver_id) => {
    const response = await axios.post('https://booksfacefake.000webhostapp.com/mediaBE/api/messages/deleteMessage.php', {
        sender_id: sender_id,
        receiver_id: receiver_id,
        access_token: token
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return response;
}

const apiMessage = { getFriendMessage, getMessage, sendMessage, countMessage, getAllMessage, deleteMessage, countReceiveAndSendMessage };

export default apiMessage;