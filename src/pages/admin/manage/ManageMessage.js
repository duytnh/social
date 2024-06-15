import React, { useEffect, useState } from 'react'
import './style.scss'
import { useSelector } from 'react-redux';
import AlertError from '../../../components/Alert/AlertError';
import AlertSuccess from '../../../components/Alert/AlertSuccess';
import Table from '../../../components/Table';
import ConfirmModal from '../../../components/Alert/ConfirmModal';
import apiMessage from '../../../services/Messages';
import Card from '../../../components/Card';


function ManageComment() {
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;

    const [count, setCount] = useState(0);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedMsg, setSelectedMsg] = useState(null);
    const [allMsg, setAllMsg] = useState([]);

    const columns = [
        { header: 'ID', accessor: 'conversation_id' },
        { header: 'Username Message', accessor: 'user_message' },
        { header: 'Date', accessor: 'last_message_time', hideOnSmall: true },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
            setMessage('');
        }, 3000);
        return () => clearTimeout(timer);
    }, [error, message]);

    useEffect(() => {
        const fetchCountMsg = async () => {
            try {
                const response = await apiMessage.countMessage(token);
                if (response.data.status === 200) {
                    setCount(response.data.data[0].count_message);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Máy chủ không phản hồi');
            }
        };

        fetchCountMsg();
    }, [token]);

    useEffect(() => {
        const fetchAllMsg = async () => {
            try {
                const response = await apiMessage.getAllMessage(token);
                if (response.data.status === 200) {
                    setAllMsg(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Máy chủ không phản hồi');
            }
        };

        fetchAllMsg();
    }, [token]);

    const handleDelete = async (messages) => {
        const idData = messages.conversation_id.split("-");
        const sender_id = idData[0];
        const receiver_id = idData[1];
        try {
            const response = await apiMessage.deleteMessage(token, sender_id, receiver_id);
            if (response.data.status === 200) {
                setAllMsg(allMsg.filter(m => m.conversation_id !== messages.conversation_id));
                setMessage(response.data.message);

            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    };

    const confirmDelete = (messages) => {
        setSelectedMsg(messages);
        setShowModal(true);
    };

    const handleConfirmDelete = (messages) => {
        handleDelete(messages);
        setShowModal(false);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedMsg(null);
    };

    return (
        <div className='manage-message'>
            <div className='card m-3' style={{ backgroundColor: 'transparent', border: 'none' }}>
                <Card
                    backgroundItem='rgb(28, 170, 123)'
                    backgroundBall1='rgb(93, 180, 151, 0.8)'
                    backgroundBall2='rgb(8, 128, 88, 0.9)'
                    btn1={<i className="fa-solid fa-users"></i>}
                    btn2='Message'
                    number={count}
                    title='Total Messenger'
                />
            </div>

            <Table data={allMsg} columns={columns} itemsPerPage={6} onDelete={confirmDelete} />
            {error && (<AlertError message={error} />)}
            {message && (<AlertSuccess message={message} />)}
            {showModal && (
                <ConfirmModal
                    onClose={closeModal}
                    onConfirm={handleConfirmDelete}
                    data={selectedMsg}
                />
            )}
        </div>
    )
}

export default ManageComment
