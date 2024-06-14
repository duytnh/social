import React, { useEffect, useState } from 'react'
import './style.scss'
import { useSelector } from 'react-redux';
import AlertError from '../../../components/Alert/AlertError';
import apiAnalytics from '../../../services/Analytics';
import Table from '../../../components/Table';

function ManageNotification() {
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;

    const [allNotify, setAllNotify] = useState([]);
    const [error, setError] = useState('');

    const columns = [
        { header: 'ID', accessor: 'notification_id' },
        { header: 'User Notify', accessor: 'username', hideOnSmall: true },
        { header: 'Message', accessor: 'message' },
        { header: 'Read', accessor: 'is_read' },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
        }, 3000);
        return () => clearTimeout(timer);
    }, [error]);

    useEffect(() => {
        const fetchAllNotify = async () => {
            try {
                const response = await apiAnalytics.getAllNotify(token);
                if (response.data.status === 200) {
                    setAllNotify(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Máy chủ không phản hồi');
            }
        };

        fetchAllNotify();
    }, [token]);

    return (
        <div className='manage-post'>
            <Table data={allNotify} columns={columns} itemsPerPage={6} />
            {error && (<AlertError message={error} />)}
        </div>
    )
}

export default ManageNotification
