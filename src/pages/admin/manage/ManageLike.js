import React, { useEffect, useState } from 'react'
import './style.scss'
import { useSelector } from 'react-redux';
import AlertError from '../../../components/Alert/AlertError';
import AlertSuccess from '../../../components/Alert/AlertSuccess';
import apiAnalytics from '../../../services/Analytics';
import Table from '../../../components/Table';

function ManageLike() {
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;

    const [allLike, setAllLike] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const columns = [
        { header: 'lID', accessor: 'like_id' },
        { header: 'pID', accessor: 'post_id' },
        { header: 'User Like', accessor: 'username', hideOnSmall: true },
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
        const fetchAllLike = async () => {
            try {
                const response = await apiAnalytics.getAllLike(token);
                if (response.data.status === 200) {
                    setAllLike(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Máy chủ không phản hồi');
            }
        };

        fetchAllLike();
    }, [token]);

    const handleDelete = async (like) => {
        try {
            const response = await apiAnalytics.deleteLikeComment(like.like_id, token, 'like');
            if (response.data.status === 200) {
                setAllLike(allLike.filter(l => l.like_id !== like.like_id));
                setMessage(response.data.message);

            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    };

    return (
        <div className='manage-like'>
            <Table data={allLike} columns={columns} itemsPerPage={6} onDelete={handleDelete} />
            {error && (<AlertError message={error} />)}
            {message && (<AlertSuccess message={message} />)}
        </div>
    )
}

export default ManageLike
