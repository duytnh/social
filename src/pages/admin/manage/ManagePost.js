import React, { useEffect, useState } from 'react'
import './style.scss'
import { useSelector } from 'react-redux';
import AlertError from '../../../components/Alert/AlertError';
import AlertSuccess from '../../../components/Alert/AlertSuccess';
import apiAnalytics from '../../../services/Analytics';
import apiPost from '../../../services/PostService';
import Table from '../../../components/Table';

function ManagePost() {
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;

    const [allPost, setAllPost] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const columns = [
        { header: 'ID', accessor: 'post_id' },
        { header: 'Username', accessor: 'username', hideOnSmall: true },
        { header: 'Description', accessor: 'description' },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
            setMessage('');
        }, 3000);
        return () => clearTimeout(timer);
    }, [error, message]);

    useEffect(() => {
        const fetchAllPost = async () => {
            try {
                const response = await apiAnalytics.getAllPost(token);
                if (response.data.status === 200) {
                    setAllPost(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Máy chủ không phản hồi');
            }
        };

        fetchAllPost();
    }, [token]);

    const handleDelete = async (post) => {
        try {
            const response = await apiPost.deletePost(post.post_id, token);
            if (response.data.status === 200) {
                setAllPost(allPost.filter(p => p.post_id !== post.post_id));
                setMessage(response.data.message);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    };

    return (
        <div className='manage-post'>
            <Table data={allPost} columns={columns} itemsPerPage={6} onDelete={handleDelete} />
            {error && (<AlertError message={error} />)}
            {message && (<AlertSuccess message={message} />)}
        </div>
    )
}

export default ManagePost
