import React, { useEffect, useState } from 'react'
import './style.scss'
import { useSelector } from 'react-redux';
import AlertError from '../../../components/Alert/AlertError';
import AlertSuccess from '../../../components/Alert/AlertSuccess';
import apiAnalytics from '../../../services/Analytics';
import Table from '../../../components/Table';
import ConfirmModal from '../../../components/Alert/ConfirmModal';

function ManageComment() {
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;

    const [allCmt, setAllCmt] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedCmt, setSelectedCmt] = useState(null);

    const columns = [
        { header: 'cID', accessor: 'comment_id' },
        { header: 'pID', accessor: 'post_id' },
        { header: 'User Comment', accessor: 'username', hideOnSmall: true },
        { header: 'Comment', accessor: 'comment' },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
            setMessage('');
        }, 3000);
        return () => clearTimeout(timer);
    }, [error, message]);

    useEffect(() => {
        const fetchAllCmt = async () => {
            try {
                const response = await apiAnalytics.getAllComment(token);
                if (response.data.status === 200) {
                    setAllCmt(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Máy chủ không phản hồi');
            }
        };

        fetchAllCmt();
    }, [token]);

    const handleDelete = async (comment) => {
        try {
            const response = await apiAnalytics.deleteLikeComment(comment.comment_id, token, 'comment');
            if (response.data.status === 200) {
                setAllCmt(allCmt.filter(c => c.comment_id !== comment.comment_id));
                setMessage(response.data.message);

            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    };

    const confirmDelete = (comment) => {
        setSelectedCmt(comment);
        setShowModal(true);
    };

    const handleConfirmDelete = (comment) => {
        handleDelete(comment);
        setShowModal(false);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedCmt(null);
    };

    return (
        <div className='manage-comment'>
            <Table data={allCmt} columns={columns} itemsPerPage={6} onDelete={confirmDelete} />
            {error && (<AlertError message={error} />)}
            {message && (<AlertSuccess message={message} />)}
            {showModal && (
                <ConfirmModal
                    onClose={closeModal}
                    onConfirm={handleConfirmDelete}
                    data={selectedCmt}
                />
            )}
        </div>
    )
}

export default ManageComment
