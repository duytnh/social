import React, { useEffect, useState } from 'react'
import './style.scss'
import IconFriend from '../../../components/Friend'
import Post from '../../../components/Post';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UploadPost from '../../../components/UploadPost';
import ModalEdit from '../../../components/Profile/ModalEdit';
import { logout } from '../../../redux/authAction';
import apiFriendships from '../../../services/FriendshipService';
import apiPost from '../../../services/PostService';
import apiUser from '../../../services/UserService';

const Personal = () => {
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;
    const role = user && user.role;

    const navigate = useNavigate();
    const [allPost, setAllPost] = useState([]);
    const [profile, setProfile] = useState([]);
    const [allFriends, setAllFriends] = useState([]);
    const [images, setImages] = useState('');
    const [previewImages, setPreviewImages] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [errorAllFriend, setErrorAllFriend] = useState('');
    const [avatar, setAvatar] = useState('');
    const [error, setError] = useState('');
    const [modalEdit, setModalEdit] = useState(false);
    const [changeName, setChangeName] = useState(false);
    const [changeBio, setChangeBio] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllFriend = async () => {
            try {
                const response = await apiFriendships.getAllFriend(token, null, 6, null);
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
    }, [token]);

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
    }, [error]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await apiPost.getAllPostByUser(token, null);
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
    }, [token]);


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await apiUser.getUser(token);
                if (response.data.status === 200) {
                    setProfile(response.data.data);
                    setAvatar(response.data.data.avatar_url.replace('../../', 'https://booksfacefake.000webhostapp.com/mediaBE/'));
                } else if (response.data.status === 400) {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Máy chủ không phản hồi');
            }
        };

        fetchProfile();
    }, [token]);

    const handleLoadPageAllFriend = () => {
        navigate('/friends');
    }

    const onChangeImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImages(file);
            setPreviewImages(URL.createObjectURL(file));
        }
    }

    const handleOnChangeName = (e) => {
        setChangeName(true);
        setName(e.target.value);
    }

    const handleOnChangeBio = (e) => {
        setChangeBio(true);
        setBio(e.target.value);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const response = await apiUser.updateProfile(images, name, bio, token);
            if (response.data.status === 200) {
                const updatedProfile = {
                    ...profile,
                    avatar_url: response.data.data,
                    fullname: name,
                    bio: bio
                };
                setProfile(updatedProfile);
                setAvatar(response.data.data.replace('../../', 'https://booksfacefake.000webhostapp.com/mediaBE/'));
                setModalEdit(false);
            } else if (response.data.status === 400) {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    }

    const handleLogout = async () => {
        dispatch(logout());
        navigate("/login");
    };

    const handleDeletePost = async (post_id) => {
        try {
            const response = await apiPost.deletePost(post_id, token);
            if (response.data.status === 200) {
                alert.success(response.data.message);
                setAllPost(prevPosts => prevPosts.filter(post => post.post_id !== post_id));
            } else if (response.data.status === 400) {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    }

    const goAmin = () => {
        navigate('/dashboard');
    }


    return (
        <div className='personal'>
            <div className='picture'>
                <img className='background-img' src='./anh-nen.webp' alt='Ảnh nền' />
                <img className='avt-img' src={avatar} alt='Ảnh đại diện' />
                <button onClick={handleLogout}>ĐĂNG XUẤT</button>
            </div>
            <div className='info'>
                <h4>{profile.fullname}</h4>
                <button onClick={() => setModalEdit(true)}><i className="fa-solid fa-pen"></i> Chỉnh sửa trang cá nhân</button>
            </div>
            <div className='info-details'>
                <p>Email: {profile.email}</p>
                <p>Giới thiệu: <br />{profile.bio}</p>
                <p>Ngày tham gia: {profile.created_at}</p>
                {role && role === 'admin' && (<button onClick={goAmin} style={{ backgroundColor: '#ccc', border: 'none', padding: '5px', fontWeight: 'bold', borderRadius: '5px' }}>Go to Admin</button>)}
            </div>
            {modalEdit && (
                <ModalEdit
                    handleImageChange={onChangeImage}
                    closeModalEdit={() => setModalEdit(false)}
                    updateData={handleUpdateProfile}
                    onChangeName={handleOnChangeName}
                    onChangeBio={handleOnChangeBio}
                    image={previewImages || avatar}
                    name={changeName ? name : profile.fullname}
                    bio={changeBio ? bio : profile.bio}
                />
            )}

            <hr />
            <UploadPost />
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
                        )
                    })}
                </div>
                <button onClick={handleLoadPageAllFriend}>Xem tất cả bạn bè</button>
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
                            deletePost={handleDeletePost}
                        />
                    );
                })}

            </div>
        </div>
    )
}

export default Personal;
