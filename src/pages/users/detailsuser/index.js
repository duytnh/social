import React, { useEffect, useState } from 'react';
import './style.scss';
import IconFriend from '../../../components/Friend';
import Post from '../../../components/Post';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import apiFriendships from '../../../services/FriendshipService';
import apiPost from '../../../services/PostService';
import apiUser from '../../../services/UserService';
import AlertError from '../../../components/Alert/AlertError';
import AlertSuccess from '../../../components/Alert/AlertSuccess';


function DetailsUser() {
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;

    const { id } = useParams();
    const navigate = useNavigate();
    const [allPost, setAllPost] = useState([]);
    const [profile, setProfile] = useState({});
    const [allFriends, setAllFriends] = useState([]);
    const [errorAllFriend, setErrorAllFriend] = useState('');
    const [avatar, setAvatar] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchAllFriend = async () => {
            try {
                const response = await apiFriendships.getAllFriend(token, id, 6, null);
                if (response.data.status === 200) {
                    setAllFriends(response.data.data);
                } else if (response.data.status === 201) {
                    setErrorAllFriend(response.data.message);
                } else if (response.data.status === 400) {
                    setError(response.data.message);
                }
            } catch (e) {
                setError('Máy chủ không phản hồi');
            }
        };
        fetchAllFriend();
    }, [token, id]);

    useEffect(() => {
        if (user == null) {
            navigate('/login');
            return;
        }
    }, [navigate, user]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
        }, 3000);
        return () => clearTimeout(timer);

    }, [message, error]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await apiPost.getAllPostByUser(token, id)
                if (response.data.status === 200) {
                    setAllPost(response.data.data);
                } else if (response.data.status === 201) {
                    setError(response.data.message);
                } else if (response.data.status === 400) {
                    setError(response.data.message);
                }
            } catch (e) {
                setError('Máy chủ không phản hồi');
            }
        };

        fetchPosts();
    }, [token, id]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await apiUser.getUser(token, id);
                if (response.data.status === 200) {
                    setProfile(response.data.data);
                    setAvatar(response.data.data.avatar_url.replace('../../', 'https://booksfacefake.000webhostapp.com/mediaBE/'));
                } else if (response.data.status === 400) {
                    console.log(response.data);
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Máy chủ không phản hồi');
            }
        };

        fetchProfile();
    }, [token, id]);

    const handleFriendAction = async (action) => {
        try {
            const response = await apiFriendships.friend(id, token, action);
            if (response.data.status === 200) {
                setMessage(response.data.message);
                const newStatusMap = {
                    'send': 'sended',
                    'accept': 'friend',
                    'reject': 'dontfriend',
                    'delete': 'dontfriend'
                };
                const newStatus = newStatusMap[action] || '';

                setProfile(prevProfile => ({
                    ...prevProfile,
                    relationship_status: newStatus
                }));
            } else if (response.data.status === 400) {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    };

    const openMessagePage = () => {
        localStorage.setItem('selectedPage', `messenger/${id}`);
        navigate(`/messenger/${id}`);
    }

    return (
        <div className='personal'>
            <div className='picture'>
                <img className='background-img' src='/anh-nen.webp' alt='Ảnh nền' />
                <img className='avt-img' src={avatar} alt='Ảnh đại diện' />
            </div>
            <div className='info'>
                <h4>{profile.fullname}</h4>
            </div>
            <div className='relationship-status'>
                {profile.relationship_status && profile.relationship_status === 'dontfriend'
                    ? (
                        <div className='btn-relationship-add'>
                            <button onClick={() => handleFriendAction('send')}><i className="fa-solid fa-user-plus"></i> Thêm bạn</button>
                        </div>
                    )
                    : profile.relationship_status === 'sended'
                        ? (
                            <div className='btn-relationship-sended'>
                                <button><i className="fa-solid fa-hourglass-half"></i> Đã gửi yêu cầu</button>
                            </div>
                        )
                        : profile.relationship_status === 'issend'
                            ? (
                                <div className='btn-relationship-issend'>
                                    <button onClick={() => handleFriendAction('accept')}><i className="fa-solid fa-user-check"></i> Chấp nhận</button>
                                    <button onClick={() => handleFriendAction('reject')}><i className="fa-solid fa-user-xmark"></i> Từ chối</button>
                                </div>
                            )
                            : profile.relationship_status === 'friend' && (
                                <div className='btn-relationship-friend'>
                                    <button onClick={() => handleFriendAction('delete')}><i className="fa-solid fa-user-minus"></i> Hủy kết bạn</button>
                                </div>
                            )
                }
                <button className='btnMessage' onClick={openMessagePage}><i className="fa-brands fa-facebook-messenger"></i> Nhắn tin</button>
            </div>
            <div className='info-details'>
                <p>Email: {profile.email}</p>
                <p>Giới thiệu: <br />{profile.bio}</p>
                <p>Ngày tham gia: {profile.created_at}</p>
            </div>

            <hr></hr>

            <div className='list-friend'>
                <h4>Bạn bè</h4>
                {errorAllFriend && (<h6>{errorAllFriend}</h6>)}
                <div className='lists'>
                    {allFriends.map((friend, index) => {
                        return (
                            <IconFriend
                                key={index}
                                name={friend.fullname}
                                image={friend.avatar_url.replace('../../', 'https://booksfacefake.000webhostapp.com/mediaBE/')}
                                id={friend.friend_id}
                            />
                        );
                    })}
                </div>
            </div>
            <hr />
            <div className='post-list'>
                <h4>Bài viết</h4>
                {error && (<h5>{error}</h5>)}
                {allPost.map((post, index) => {
                    return (
                        <Post
                            key={index}
                            user_avatar={post.user_avatar}
                            user_fullname={post.user_fullname}
                            created_at={post.created_at}
                            description={post.description}
                            images={post.images}
                            total_likes={post.total_likes}
                            total_comments={post.total_comments}
                            comments={post.comments}
                            post_id={post.post_id}
                            userId_post={post.user_id}
                        />
                    );
                })}
            </div>
            {message && (<AlertSuccess message={message} />)}
            {error && (<AlertError message={error} />)}
        </div>
    );
}

export default DetailsUser;
