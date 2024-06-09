import React, { useState, useEffect } from 'react';
import { ROUTERS } from '../../../../utils/router';
import { Link, useLocation, useNavigate } from "react-router-dom";
import './style.scss';
import { useSelector } from 'react-redux';
import { debounce } from 'lodash';
import SearchBox from '../../../../components/Search/SearchBox';
import AlertSuccess from '../../../../components/Alert/AlertSuccess';
import AlertError from '../../../../components/Alert/AlertError';
import apiFriendships from '../../../../services/FriendshipService';
import apiUser from '../../../../services/UserService';

function Header() {
    const [selectedPage, setSelectedPage] = useState('');
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;
    const [searchTerm, setSearchTerm] = useState('');
    const [allUser, setAllUser] = useState([]);
    const location = useLocation();
    const currentPage = location.pathname;
    const page = currentPage.substring(currentPage.lastIndexOf('/') + 1);
    const [showSearch, setShowSearch] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const data = [
        {
            path: ROUTERS.USER.HOME,
            icon: <i className="fa-regular fa-newspaper"></i>
        },
        {
            path: ROUTERS.USER.FRIENDS,
            icon: <i className="fa-solid fa-user-group"></i>
        },
        {
            path: ROUTERS.USER.NOTIFY,
            icon: <i className="fa-solid fa-bell"></i>
        },
        {
            path: ROUTERS.USER.INFO,
            icon: <i className="fa-solid fa-user"></i>
        }
    ];

    useEffect(() => {
        const savedPage = localStorage.getItem('selectedPage');
        if (savedPage) {
            setSelectedPage(savedPage);
            navigate('/' + savedPage);
        } else {
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                setError('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, error]);

    const debouncedSearch = debounce(async (value) => {
        try {
            const response = await apiUser.getAllUser(token, value);
            if (response.data.status === 200) {
                setAllUser((response.data.data));
            } else if (response.data.status === 400) {
                setError(response.data.message);
            }
        } catch (e) {
            setError('Máy chủ không phản hồi');
        }
    }, 500);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        if (value !== '') {
            debouncedSearch(value);
            setShowSearch(true);
        } else {
            setAllUser([]);
            setShowSearch(false);
        }
    };

    const handleClick = (path) => {
        setSelectedPage(path);
        localStorage.setItem('selectedPage', path);
    };

    const handleAddFriend = async (id) => {
        try {
            const response = await apiFriendships.friend(id, token, 'send');
            if (response.data.status === 200) {
                setMessage(response.data.message);
                page && page === 'friends' && window.location.reload();
                const updatedAllUser = allUser.map(user => {
                    if (user.user_id === id) {
                        return {
                            ...user,
                            relationship_status: 'sended'
                        };
                    }
                    return user;
                });
                setAllUser(updatedAllUser);
            } else if (response.data.status === 400) {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    }
    const handleAcceptFriend = async (id) => {
        try {
            const response = await apiFriendships.friend(id, token, 'accept');
            if (response.data.status === 200) {
                setMessage(response.data.message);
                page && page === 'friends' && window.location.reload();
                const updatedAllUser = allUser.map(user => {
                    if (user.user_id === id) {
                        return {
                            ...user,
                            relationship_status: 'isfriend'
                        };
                    }
                    return user;
                });
                setAllUser(updatedAllUser);

            } else if (response.data.status === 400) {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    }
    const handleRejectFriend = async (id) => {
        try {
            const response = await apiFriendships.friend(id, token, 'reject');
            if (response.data.status === 200) {
                setMessage(response.data.message);
                page && page === 'friends' && window.location.reload();
                const updatedAllUser = allUser.map(user => {
                    if (user.user_id === id) {
                        return {
                            ...user,
                            relationship_status: 'dontfriend'
                        };
                    }
                    return user;
                });
                setAllUser(updatedAllUser);
            } else if (response.data.status === 400) {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    }
    const handleDeleteFriend = async (id) => {
        try {
            const response = await apiFriendships.friend(id, token, 'delete');
            if (response.data.status === 200) {
                setMessage(response.data.message);
                page && page === 'friends' && window.location.reload();
                const updatedAllUser = allUser.map(user => {
                    if (user.user_id === id) {
                        return {
                            ...user,
                            relationship_status: 'dontfriend'
                        };
                    }
                    return user;
                });
                setAllUser(updatedAllUser);
            } else if (response.data.status === 400) {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    }

    const closeSearchBox = () => {
        setSearchTerm('');
        setShowSearch(false);
    }

    return (
        <nav className='header'>
            <div className='header-top'>
                <input type='text' value={searchTerm} onChange={handleInputChange} />
                <span><i className="fa-solid fa-magnifying-glass"></i></span>
            </div>
            {showSearch && (
                <SearchBox
                    results={allUser}
                    addFriend={handleAddFriend}
                    acceptFriend={handleAcceptFriend}
                    rejectFriend={handleRejectFriend}
                    deleteFriend={handleDeleteFriend}
                    closeBox={closeSearchBox}
                />
            )}

            {message && (<AlertSuccess message={message} />)}
            {error && (<AlertError message={error} />)}

            <div className='header-bottom'>
                <ul>
                    {data.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleClick(item.path)}
                        >
                            <Link to={item.path} className={selectedPage === item.path ? 'selected' : ''}>
                                {item.icon}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default Header;

