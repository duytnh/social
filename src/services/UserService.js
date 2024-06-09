import axios from "axios";

const RegisterUser = async (username, password, email) => {
    const response = await axios.post('https://booksfacefake.000webhostapp.com/mediaBE/api/users/register.php', {
        username: username,
        password: password,
        email: email
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    return response;
}

const LoginUser = async (username, password) => {
    const response = await axios.post('https://booksfacefake.000webhostapp.com/mediaBE/api/users/login.php', {
        username: username,
        password: password
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    return response;
}

const getUser = async (token, user_id = null) => {
    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/users/getUser.php', {
        params: {
            access_token: token,
            user_id: user_id
        }
    });
    return response;
}

const getUserById = async (token, id) => {
    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/users/getUser.php', {
        params: {
            access_token: token,
            user_id: id
        }
    });
    return response;
}

const getAllUser = async (token, value) => {
    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/users/getAllUser.php', {
        params: {
            access_token: token,
            search: value
        }
    });
    return response;
}

const updateProfile = async (images, name, bio, token) => {
    const response = await axios.post('https://booksfacefake.000webhostapp.com/mediaBE/api/users/updateProfile.php', {
        avatar_url: images,
        fullname: name,
        bio: bio,
        access_token: token
    }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response;
}

const sendCodePassword = async (email) => {
    const response = await axios.post('https://booksfacefake.000webhostapp.com/mediaBE/api/users/sendCodePassword.php', {
        email: email
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return response;
}

const changePassword = async (code, password) => {
    const response = await axios.post('https://booksfacefake.000webhostapp.com/mediaBE/api/users/changePassword.php', {
        code: code,
        password: password
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return response;
}

const getSendFriend = async (token) => {
    const response = await axios.get('https://booksfacefake.000webhostapp.com/mediaBE/api/users/getSendFriend.php', {
        params: {
            access_token: token,
        }
    });
    return response;
}

const apiUser = { RegisterUser, LoginUser, getUser, getUserById, getAllUser, getSendFriend, updateProfile, sendCodePassword, changePassword };

export default apiUser;