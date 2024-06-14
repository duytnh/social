import React, { useEffect, useState } from 'react'
import './style.scss'
import { useSelector } from 'react-redux';
import AlertError from '../../../components/Alert/AlertError';
import apiAnalytics from '../../../services/Analytics';
import Table from '../../../components/Table';
import Card from '../../../components/Card';
import apiUser from '../../../services/UserService';
import AlertSuccess from '../../../components/Alert/AlertSuccess';
import ConfirmModal from '../../../components/Alert/ConfirmModal';

function ManageUser() {
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;

    const [allUser, setAllUser] = useState([]);
    const [count, setCount] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const columns = [
        { header: 'ID', accessor: 'user_id' },
        { header: 'Username', accessor: 'username' },
        { header: 'Name', accessor: 'fullname', hideOnSmall: true },
        { header: 'Role', accessor: 'role' },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
            setMessage('');
        }, 3000);
        return () => clearTimeout(timer);
    }, [error, message]);

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

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await apiAnalytics.count(token);
                if (response.data.status === 200) {
                    setCount(response.data.numUser);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Máy chủ không phản hồi');
            }
        };

        fetchCount();
    }, [token]);

    const handleDelete = async (user) => {
        try {
            const response = await apiUser.deleteUser(user.user_id, token);
            if (response.data.status === 200) {
                setAllUser(allUser.filter(u => u.user_id !== user.user_id));
                setMessage(response.data.message);

            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    };

    const confirmDelete = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleConfirmDelete = (user) => {
        handleDelete(user);
        setShowModal(false);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    return (
        <div className='manage-user'>
            <div className='card m-3' style={{ backgroundColor: 'transparent', border: 'none' }}>
                <Card
                    backgroundItem='rgb(28, 170, 123)'
                    backgroundBall1='rgb(93, 180, 151, 0.8)'
                    backgroundBall2='rgb(8, 128, 88, 0.9)'
                    btn1={<i className="fa-solid fa-users"></i>}
                    btn2='User'
                    number={count}
                    title='Total User'
                />
            </div>
            <Table data={allUser} columns={columns} itemsPerPage={6} onDelete={confirmDelete} />
            {error && (<AlertError message={error} />)}
            {message && (<AlertSuccess message={message} />)}
            {showModal && (
                <ConfirmModal
                    onClose={closeModal}
                    onConfirm={handleConfirmDelete}
                    data={selectedUser}
                />
            )}
        </div>
    )
}

export default ManageUser
