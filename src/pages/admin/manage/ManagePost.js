import React, { useEffect, useState } from 'react'
import './style.scss'
import { useSelector } from 'react-redux';
import AlertError from '../../../components/Alert/AlertError';
import AlertSuccess from '../../../components/Alert/AlertSuccess';
import apiAnalytics from '../../../services/Analytics';
import apiPost from '../../../services/PostService';
import Table from '../../../components/Table';
import Card from '../../../components/Card';
import ConfirmModal from '../../../components/Alert/ConfirmModal';

function ManagePost() {
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;

    const [allPost, setAllPost] = useState([]);
    const [count, setCount] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

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

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await apiAnalytics.count(token);
                if (response.data.status === 200) {
                    setCount(response.data.numPost);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Máy chủ không phản hồi');
            }
        };

        fetchCount();
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

    const confirmDelete = (post) => {
        setSelectedPost(post);
        setShowModal(true);
    };

    const handleConfirmDelete = (post) => {
        handleDelete(post);
        setShowModal(false);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedPost(null);
    };

    return (
        <div className='manage-post'>
            <div className='card m-3' style={{ backgroundColor: 'transparent', border: 'none' }}>
                <Card
                    backgroundItem='rgb(94, 53, 177)'
                    backgroundBall1='rgb(138, 79, 255)'
                    backgroundBall2='rgb(96, 33, 221)'
                    btn1={<i className="fa-regular fa-newspaper"></i>}
                    btn2='Post'
                    number={count}
                    title='Total Post'
                />
            </div>
            <Table data={allPost} columns={columns} itemsPerPage={6} onDelete={confirmDelete} />
            {error && (<AlertError message={error} />)}
            {message && (<AlertSuccess message={message} />)}
            {showModal && (
                <ConfirmModal
                    onClose={closeModal}
                    onConfirm={handleConfirmDelete}
                    data={selectedPost}
                />
            )}
        </div>
    )
}

export default ManagePost
