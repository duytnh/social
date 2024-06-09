import React, { useEffect, useState } from 'react'
import IconSendFriend from '../../../components/Friend/IconSendFriend';
import { useSelector } from 'react-redux';
import './style.scss'
import IconFriendPage from '../../../components/Friend/IconFriendPage';
import apiFriendships from '../../../services/FriendshipService';
import AlertSuccess from '../../../components/Alert/AlertSuccess';
import AlertError from '../../../components/Alert/AlertError';

const Friend = () => {
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;
    const [friends, setFriends] = useState([]);
    const [allFriends, setAllFriends] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [errorAllFriend, setErrorAllFriend] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchSendFriend = async () => {
            try {
                const response = await apiFriendships.getSendFriend(token);
                if (response.data.status === 200) {
                    setFriends((response.data.data));
                } else if (response.data.status === 201) {
                    setError(response.data.message);
                } else if (response.data.status === 400) {
                    setError(response.data.message);
                }
            } catch (e) {
                setError('Máy chủ không phản hồi');
            }
        };
        fetchSendFriend();
    }, [token]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
        }, 3000);
        return () => clearTimeout(timer);

    }, [message, error]);

    useEffect(() => {
        const fetchAllFriend = async (page) => {
            try {
                const response = await apiFriendships.getAllFriend(token, null, null, page);
                if (response.data.status === 200) {
                    const newAllFriends = response.data.data;
                    setAllFriends((prevAllFriends) => [...prevAllFriends, ...newAllFriends]);
                    if (newAllFriends.length < 10) {
                        setHasMore(false);
                    }
                } else if (response.data.status === 201) {
                    setErrorAllFriend(response.data.message);
                } else if (response.data.status === 400) {
                    setError(response.data.message);
                }
            } catch (e) {
                setError('Máy chủ không phản hồi');
            } finally {
                setLoading(false);
            }
        };
        fetchAllFriend(page);
    }, [page, token]);

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handleAcceptFriend = async (id) => {
        try {
            const response = await apiFriendships.friend(id, token, 'accept');
            if (response.data.status === 200) {
                setMessage(response.data.message);
                const acceptedFriend = friends.find(friend => friend.user_id === id);
                setFriends(friends.filter(friend => friend.user_id !== id));
                setAllFriends([acceptedFriend, ...allFriends]);
                setErrorAllFriend('');
            } else if (response.data.status === 400) {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    };

    const handleRejectFriend = async (id) => {
        try {
            const response = await apiFriendships.friend(id, token, 'reject');
            if (response.data.status === 200) {
                alert.success(response.data.message);
                setFriends(friends.filter(friend => friend.friend_id !== id));
            } else if (response.data.status === 400) {
                alert.error(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    };

    const handleDeleteFriend = async (id) => {
        try {
            const response = await apiFriendships.friend(id, token, 'delete');
            if (response.data.status === 200) {
                alert.success(response.data.message);
                setAllFriends(allFriends.filter(friend => friend.friend_id !== id));
            } else if (response.data.status === 400) {
                alert.error(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    };

    return (
        <div className='friends-page'>
            <h5>Lời mời kết bạn</h5>
            {error && (<h6>{error}</h6>)}
            {friends.map((friend, index) => {
                return (
                    <IconSendFriend
                        key={index}
                        name={friend.fullname}
                        image={friend.avatar_url.replace('../../', 'https://booksfacefake.000webhostapp.com/mediaBE/')}
                        id={friend.user_id}
                        acceptFriend={handleAcceptFriend}
                        rejectFriend={handleRejectFriend}
                    />
                )
            })}

            {friends.length <= 0 && (<p>Không có lời mời kết bạn nào</p>)}

            <hr></hr>
            <h5>Bạn bè</h5>
            {allFriends.map((all, index) => {
                return (
                    <IconFriendPage
                        key={index}
                        name={all.fullname}
                        image={all.avatar_url.replace('../../', 'https://booksfacefake.000webhostapp.com/mediaBE/')}
                        id={all.friend_id}
                        deleteFriend={handleDeleteFriend}
                    />
                )
            })}

            {message && (<AlertSuccess message={message} />)}
            {error && (<AlertError message={error} />)}
            {errorAllFriend && (<h6>{errorAllFriend}</h6>)}
            {loading && <p>Loading...</p>}
            {!errorAllFriend && !loading ? (<button className='btn-more' onClick={handleLoadMore}><i className="fa-solid fa-circle-chevron-down"></i></button>) : ('')}
        </div>
    )
}

export default Friend
