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
    const userId = user && user.user_id;
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

    const detailsPost = async (idPost, friendId, notifyId) => {
        const response = await apiPost.readNotify(notifyId);
        if (response.data.status === 200) {
            if (idPost) {
                localStorage.setItem('selectedPage', `details-post/${idPost}`);
                navigate(`/details-post/${idPost}`);
            } else {
                localStorage.setItem('selectedPage', `details-user/${friendId}`);
                navigate(`/details-user/${friendId}`);
            }
        } else if (response.data.status === 400) {
            setError(response.data.message);
        }
    }

    return (
        <div className='notify'>
            <h5>Thông báo</h5>
            {notifys ? notifys.map((item, index) => {
                let friendName = '';
                if (item.msg === 'Đã thích bài viết của ' || item.msg === 'Đã thêm một bình luận cho bài viết của ') {
                    friendName = item.post_owner_fullname === item.user_fullname ? 'bạn' : item.post_owner_fullname;
                } else if (item.msg === 'Đã gửi lời mời kết bạn đến ' || item.msg === 'Đã chấp nhận kết bạn với ' || item.msg === 'Đã từ chối kết bạn với ') {
                    friendName = Number(item.friend_id) === Number(userId) ? 'bạn' : item.friend_fullname;
                }
                return (
                    <Notification
                        key={index}
                        name={Number(item.friend_id) === userId ? item.user_fullname : "Bạn"}
                        image={item.user_avatar && item.user_avatar.replace('../../', 'https://booksfacefake.000webhostapp.com/mediaBE/')}
                        message={`${item.msg} ${friendName}`}
                        created={item.created_at}
                        isRead={item.is_read}
                        detailsPost={() => detailsPost(item.post_id, item.friend_id, item.notification_id)}
                    />
                )
            }) : <span style={{ paddingBottom: '30px !important' }}>Không có thông báo nào</span>}
            {error && (<AlertError message={error} />)}
        </div>
    )
}

export default Notificate
