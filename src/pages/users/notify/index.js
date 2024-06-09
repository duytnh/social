import React, { useEffect, useState } from 'react'
import './style.scss'
import Notification from '../../../components/Notifications/Notification'
import { useSelector } from 'react-redux';
import apiPost from '../../../services/PostService';
import AlertError from '../../../components/Alert/AlertError';
import { useNavigate } from 'react-router-dom';

function Notificate() {
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;
    const [notifys, setNotifys] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotify = async () => {
            try {
                const response = await apiPost.getNotify(token);
                if (response.data.status === 200) {
                    setNotifys(response.data.data);
                } else if (response.data.status === 400) {
                    setError(response.data.message);
                }
            } catch (e) {
                setError('Máy chủ không phản hồi');
            }
        };
        fetchNotify();
    }, [token]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
        }, 3000);
        return () => clearTimeout(timer);

    }, [error]);

    const detailsPost = async (id, notifyId) => {
        const response = await apiPost.readNotify(notifyId);
        if (response.data.status === 200) {
            localStorage.setItem('selectedPage', `details-post/${id}`);
            navigate(`/details-post/${id}`);
        } else if (response.data.status === 400) {
            setError(response.data.message);
        }
    }

    return (
        <div className='notify'>
            <h5>Thông báo</h5>
            {notifys ? notifys.map((item, index) => {
                const friendName = item.post_owner_fullname === item.user_fullname ? 'bạn' : item.post_owner_fullname ? item.post_owner_fullname : item.friend_fullname;
                return (
                    <Notification
                        key={index}
                        name={item.user_fullname}
                        image={item.user_avatar && item.user_avatar.replace('../../', 'https://booksfacefake.000webhostapp.com/mediaBE/')}
                        message={`${item.msg} ${friendName}`}
                        created={item.created_at}
                        isRead={item.is_read}
                        detailsPost={() => detailsPost(item.post_id, item.notification_id)}
                    />
                )
            }) : <span style={{ paddingBottom: '30px !important' }}>Không có thông báo nào</span>}
            {error && (<AlertError message={error} />)}
        </div>
    )
}

export default Notificate
