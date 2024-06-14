import React, { useEffect, useState } from 'react';
import './style.scss';
import apiUser from '../../../../services/UserService';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AlertError from '../../../../components/Alert/AlertError';
import { logout } from '../../../../redux/authAction';

function Top({ showLeft }) {
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;
    const [searchActive, setSearchActive] = useState(false);
    const [profile, setProfile] = useState([]);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearchClick = () => {
        setSearchActive(true);
    };

    const handleHideClick = () => {
        setSearchActive(false);
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await apiUser.getUser(token);
                if (response.data.status === 200) {
                    setProfile(response.data.data);
                } else if (response.data.status === 400) {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Máy chủ không phản hồi');
            }
        };

        fetchProfile();
    }, [token]);

    const handleLogout = async () => {
        dispatch(logout());
        navigate("/login");
    }

    const handleProfile = () => {
        navigate("/profile");
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
        }, 3000);
        return () => clearTimeout(timer);
    }, [error]);

    const openSetting = () => {
        setOpen(!open);
    }

    return (
        <div className={`admin-top ${searchActive ? 'search-active' : ''}`}>
            <div className='left-group'>
                <div className='top-icon'>
                    <span>facebook</span>
                    <div onClick={showLeft}><i className="fa-solid fa-bars"></i></div>
                </div>
                <div className={`top-search animate__animated ${searchActive ? 'animate__backInLeft' : ''}`}>
                    <button className='btn-icon-search' onClick={handleSearchClick}><i className="fa-solid fa-magnifying-glass"></i></button>
                    <input type='search' />
                    <button className='btn-icon-fill'><i className="fa-solid fa-sliders"></i></button>
                    <button className='btn-icon-hide' onClick={handleHideClick}><i className="fa-solid fa-xmark"></i></button>
                </div>
            </div>
            <div className='right-group'>
                <div className='top-notify'>
                    <button><i className="fa-solid fa-bell"></i></button>
                </div>
                <div className='top-account'>
                    <img src={profile.avatar_url && profile.avatar_url.replace('../../', 'https://booksfacefake.000webhostapp.com/mediaBE/')} alt='image person' />
                    <span onClick={openSetting}><i className="fa-solid fa-gear"></i></span>
                </div>
                {open && (
                    <div className='option'>
                        <p className='text-danger' onClick={handleLogout}>Logout</p>
                        <p className='text-secondary' onClick={handleProfile}>Profile</p>
                    </div>
                )}
            </div>
            {error && (<AlertError message={error} />)}
        </div>
    );
}

export default Top;
