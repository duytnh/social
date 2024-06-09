import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import apiPost from '../../../services/PostService';
import Post from '../../../components/Post';
import AlertError from '../../../components/Alert/AlertError';

function DetailsPost() {
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;
    const { id } = useParams();

    const [post, setPost] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
        }, 2000);
        return () => clearTimeout(timer);

    }, [error]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await apiPost.getDetailsPost(token, id)
                if (response.data.status === 200) {
                    setPost(response.data.data);
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



    return (
        <div>
            {post.map((item, index) => {
                return (
                    <Post
                        key={index}
                        user_avatar={item.user_avatar}
                        user_fullname={item.user_fullname}
                        created_at={item.created_at}
                        description={item.description}
                        images={item.images}
                        total_likes={item.total_likes}
                        total_comments={item.total_comments}
                        comments={item.comments}
                        post_id={item.post_id}
                        userId_post={item.user_id}
                    />
                );
            })}
            {error && (<AlertError message={error} />)}
        </div>
    )
}

export default DetailsPost
