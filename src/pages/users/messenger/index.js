import React, { useEffect, useState } from 'react';
import './style.scss';
import IconMessage from '../../../components/Messenger/IconMessage';
import apiMessage from '../../../services/Messages';
import { useSelector } from 'react-redux';
import AlertError from '../../../components/Alert/AlertError';
import Messenger from '../../../components/Messenger/Messenger';
import apiFriendships from '../../../services/FriendshipService';
import FriendMessage from '../../../components/Friend/FriendMessage';
import { useParams } from 'react-router-dom'; // Import useNavigate và useParams từ react-router-dom
import apiUser from '../../../services/UserService';

function MessengerPage() {
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;
    const { id: receiverId } = useParams(); // Lấy receiverId từ URL nếu có

    const [messenger, setMessenger] = useState(null);
    const [received, setReceived] = useState([]);
    const [sent, setSent] = useState([]);
    const [error, setError] = useState('');
    const [openMessage, setOpenMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [allFriendMessage, setAllFriendMessage] = useState([]);
    const [showFriend, setShowFriend] = useState(false);
    const [currentReceiverId, setCurrentReceiverId] = useState(null);
    const [allUser, setAllUser] = useState([]);

    useEffect(() => {
        const fetchFriendMessage = async () => {
            try {
                const response = await apiMessage.getFriendMessage(token);
                if (response.data.status === 200) {
                    setMessenger(response.data.data);
                } else if (response.data.status === 400) {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Máy chủ không phản hồi');
            }
        };
        fetchFriendMessage();
    }, [token]);

    useEffect(() => {
        const fetchAllUser = async () => {
            try {
                const response = await apiUser.getAllUser(token, null);
                if (response.data.status === 200) {
                    setAllUser(response.data.data);
                } else if (response.data.status === 400) {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Máy chủ không phản hồi');
            }
        };
        fetchAllUser();
    }, [token]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
        }, 3000);
        return () => clearTimeout(timer);
    }, [error]);

    const handleOpenMessage = async (id) => {
        setOpenMessage(true);
        setCurrentReceiverId(id);

        try {
            const response = await apiMessage.getMessage(token, id);
            if (response.data.status === 200) {
                setReceived(response.data.data.received || []);
                setSent(response.data.data.sent || []);
            } else if (response.data.status === 400) {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    };

    useEffect(() => {
        if (receiverId) {
            handleOpenMessage(receiverId);
        }
    }, [receiverId]);

    const ChangeInputMessage = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        try {
            if (receiverId) {
                await apiMessage.sendMessage(token, Number(receiverId), message);
            } else {
                await apiMessage.sendMessage(token, currentReceiverId, message);
            }
            setMessage('');
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    };

    // Polling for new messages
    useEffect(() => {
        let polling;

        if (openMessage && currentReceiverId) {
            const fetchMessages = async () => {
                try {
                    const response = await apiMessage.getMessage(token, currentReceiverId);
                    if (response.data.status === 200) {
                        setReceived(response.data.data.received || []);
                        setSent(response.data.data.sent || []);
                    } else if (response.data.status === 400) {
                        setError(response.data.message);
                    }
                } catch (error) {
                    setError('Máy chủ không phản hồi');
                }
            };

            fetchMessages();
            polling = setInterval(fetchMessages, 5000); // Poll every 5 seconds
        }

        return () => clearInterval(polling);
    }, [openMessage, token, currentReceiverId]);

    const newMessenger = async () => {
        setShowFriend(!showFriend);
        try {
            const response = await apiFriendships.getAllFriend(token, null, 6, null);
            if (response.data.status === 200) {
                setAllFriendMessage(response.data.data);
            } else if (response.data.status === 400) {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    };

    const handleOpenBoxMessage = async (id) => {
        setCurrentReceiverId(id);
        setOpenMessage(true);
        setShowFriend(false);

        try {
            const response = await apiMessage.getMessage(token, id);
            if (response.data.status === 200) {
                setReceived(response.data.data.received || []);
                setSent(response.data.data.sent || []);
            } else if (response.data.status === 400) {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    };

    useEffect(() => {
        if (receiverId) {
            if (openMessage && sent.length === 0) {
                const users = allUser.find(users => Number(users.user_id) === Number(receiverId));
                if (users) {
                    setSent([{
                        receiver_id: users.user_id,
                        receiver_avatar_url: users.avatar_url,
                        receiver_fullname: users.fullname
                    }]);
                }
            }
        } else {
            if (openMessage && sent.length === 0 && currentReceiverId) {
                const friend = allFriendMessage.find(friend => friend.friend_id === currentReceiverId);
                if (friend) {
                    setSent([{
                        receiver_id: friend.friend_id,
                        receiver_avatar_url: friend.avatar_url,
                        receiver_fullname: friend.fullname
                    }]);
                }
            }
        }
    }, [openMessage, allFriendMessage, currentReceiverId, sent, receiverId, allUser]);

    const handleLoseMessage = async () => {
        setOpenMessage(false);
        try {
            const response = await apiMessage.getFriendMessage(token);
            if (response.data.status === 200) {
                setMessenger(response.data.data);
            } else if (response.data.status === 400) {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    }

    return (
        <div className='messenger-page p-3'>
            <center><button onClick={newMessenger} className='btn-add-message'><i className="fa-solid fa-plus"></i></button></center>
            <p className='text-center text-danger'>Lưu ý: Chúng tôi sẽ xóa cuộc trò chuyện của bạn sau 24 giờ.</p>
            {showFriend && (
                <div className='show-friend'>
                    {allFriendMessage && allFriendMessage.map((item, index) => (
                        <FriendMessage
                            key={index}
                            image={item.avatar_url.replace('../../', 'https://booksfacefake.000webhostapp.com/mediaBE/')}
                            name={item.fullname}
                            id={item.friend_id}
                            newMessageBox={handleOpenBoxMessage}
                        />
                    ))}
                </div>
            )}
            {messenger && messenger.map((item, index) => (
                <IconMessage
                    key={index}
                    id={item.user_id}
                    fullname={item.fullname}
                    avatar={item.avatar_url && item.avatar_url.replace('../../', 'https://booksfacefake.000webhostapp.com/mediaBE/')}
                    onOpenMessage={handleOpenMessage}
                />
            ))}
            {openMessage && (
                <Messenger
                    avatar_reciver={sent.length > 0 ? sent[0].receiver_avatar_url.replace('../../', 'https://booksfacefake.000webhostapp.com/mediaBE/') : ''}
                    fullname_reciver={sent.length > 0 ? sent[0].receiver_fullname : ''}
                    dataReceived={received}
                    dataSent={sent}
                    closeMessage={handleLoseMessage}
                    onChangeInputMessage={ChangeInputMessage}
                    sendMessage={handleSendMessage}
                    message={message}
                />
            )}
            {error && (<AlertError message={error} />)}
        </div>
    );
}

export default MessengerPage;
