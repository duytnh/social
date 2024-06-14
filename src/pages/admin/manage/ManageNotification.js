import React, { useEffect, useState } from 'react'
import './style.scss'
import { useSelector } from 'react-redux';
import AlertError from '../../../components/Alert/AlertError';
import apiAnalytics from '../../../services/Analytics';
import Table from '../../../components/Table';
import Card from '../../../components/Card';
import AlertSuccess from '../../../components/Alert/AlertSuccess';
import ConfirmModal from '../../../components/Alert/ConfirmModal';

function ManageNotification() {
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;

    const [allNotify, setAllNotify] = useState([]);
    const [count, setCount] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState(null);

    const columns = [
        { header: 'ID', accessor: 'notification_id' },
        { header: 'User Notify', accessor: 'username', hideOnSmall: true },
        { header: 'Message', accessor: 'message' },
        { header: 'Read', accessor: 'is_read' },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
            setMessage('');
        }, 3000);
        return () => clearTimeout(timer);
    }, [error, message]);

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

    const handleDelete = async (notify) => {
        try {
            const response = await apiAnalytics.deleteNotify(notify.notification_id, token);
            if (response.data.status === 200) {
                setAllNotify(allNotify.filter(n => n.notification_id !== notify.notification_id));
                setMessage(response.data.message);

            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    };

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await apiAnalytics.count(token);
                if (response.data.status === 200) {
                    setCount(response.data.numNotify);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Máy chủ không phản hồi');
            }
        };

        fetchCount();
    }, [token]);

    const confirmDelete = (notify) => {
        setSelected(notify);
        setShowModal(true);
    };

    const handleConfirmDelete = (notify) => {
        handleDelete(notify);
        setShowModal(false);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelected(null);
    };

    return (
        <div className='manage-post'>
            <div className='card m-3' style={{ backgroundColor: 'transparent', border: 'none' }}>
                <Card
                    backgroundItem='rgb(8, 100, 103)'
                    backgroundBall1='rgb(93, 160, 151, 0.8)'
                    backgroundBall2='rgb(8, 98, 88, 0.9)'
                    btn1={<i className="fa-solid fa-bell"></i>}
                    btn2='Notification'
                    number={count}
                    title='Total Notify'
                />
            </div>
            <Table data={allNotify} columns={columns} itemsPerPage={6} onDelete={confirmDelete} />
            {error && (<AlertError message={error} />)}
            {message && (<AlertSuccess message={message} />)}
            {showModal && (
                <ConfirmModal
                    onClose={closeModal}
                    onConfirm={handleConfirmDelete}
                    data={selected}
                />
            )}
        </div>
    )
}

export default ManageNotification
