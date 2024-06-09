import React, { useEffect, useState } from 'react'
import './style.scss'
import Post from '../../../components/Post';
import UploadPost from '../../../components/UploadPost';
import { useSelector } from 'react-redux';
import apiPost from '../../../services/PostService';
import AlertSuccess from '../../../components/Alert/AlertSuccess';
import AlertError from '../../../components/Alert/AlertError';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [allPost, setAllPost] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;

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
                const response = await apiPost.getAllPost(token);
                if (response.data.status === 200) {
                    setAllPost(response.data.data);
                } else if (response.data.status === 400) {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Máy chủ không phản hồi');
            }
        };
        fetchPosts();
    }, [token]);

    const handleDeletePost = async (post_id) => {
        try {
            const response = await apiPost.deletePost(post_id, token)
            if (response.data.status === 200) {
                setMessage(response.data.message);
                setAllPost(prevPosts => prevPosts.filter(post => post.post_id !== post_id));
            } else if (response.data.status === 400) {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    }

    return (
        <div className='home-page'>
            <div className='upload-post'>
                <UploadPost />
                <hr></hr>
            </div>
            <div className='post-list'>
                <h4>Bài viết</h4>
                {allPost.map((post, index) => {
                    return (
                        <Post
                            key={index}
                            user_avatar={post.user_avatar}
                            user_fullname={post.user_fullname}
                            created_at={post.created_at}
                            description={post.descriptions}
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
            {message && (<AlertSuccess message={message} />)}
            {error && (<AlertError message={error} />)}
        </div>
    )
}

export default HomePage
