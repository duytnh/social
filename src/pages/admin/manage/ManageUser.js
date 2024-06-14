import React, { useEffect, useState } from 'react'
import './style.scss'
import { useSelector } from 'react-redux';
import AlertError from '../../../components/Alert/AlertError';
import apiAnalytics from '../../../services/Analytics';
import Table from '../../../components/Table';

function ManageUser() {
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;

    const [allUser, setAllUser] = useState([]);
    const [error, setError] = useState('');

    const columns = [
        { header: 'ID', accessor: 'user_id' },
        { header: 'Username', accessor: 'username' },
        { header: 'Name', accessor: 'fullname', hideOnSmall: true },
        { header: 'Role', accessor: 'role' },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
        }, 3000);
        return () => clearTimeout(timer);
    }, [error]);

    useEffect(() => {
        const fetchAllUser = async () => {
            try {
                const response = await apiAnalytics.getAllUser(token);
                if (response.data.status === 200) {
                    setAllUser(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Máy chủ không phản hồi');
            }
        };

        fetchAllUser();
    }, [token]);

    return (
        <div className='manage-user'>
            <Table data={allUser} columns={columns} itemsPerPage={6} />
            {error && (<AlertError message={error} />)}
        </div>
    )
}

export default ManageUser
