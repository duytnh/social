import React, { useEffect, useState } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import AlertSuccess from '../../../components/Alert/AlertSuccess';
import AlertError from '../../../components/Alert/AlertError';
import apiUser from '../../../services/UserService';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../../../redux/authAction';
import { validateUsername, validatePassword } from '../../../utils/validation';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage('');
            setError('');
        }, 3000);

        return () => clearTimeout(timer);
    }, [message, error]);

    const navigate = useNavigate();
    const registerPage = () => {
        navigate('/register');
    };
    const resetPage = () => {
        navigate('/change-password');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const usernameValidationError = validateUsername(username);
        const passwordValidationError = validatePassword(password);

        if (usernameValidationError || passwordValidationError) {
            setUsernameError(usernameValidationError);
            setPasswordError(passwordValidationError);
            return;
        }

        try {
            const response = await apiUser.LoginUser(username, password);
            if (response.data.status === 200) {
                dispatch(loginSuccess(response.data));
                setMessage(response.data.message);
                localStorage.setItem('selectedPage', 'information');
                const savedPage = localStorage.getItem('selectedPage');
                savedPage ? navigate('/' + savedPage) : navigate('/');
                setPassword('');
                setUsername('');
            } else if (response.data.status === 400) {
                dispatch(loginFailure(response.data.message));
                setError(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        const validationError = validateUsername(e.target.value);
        setUsernameError(validationError);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        const validationError = validatePassword(e.target.value);
        setPasswordError(validationError);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='login'>
            <p className='logo-app pt-3'>facebook fake</p>
            <div className='login-box'>
                <div className='login-header'>
                    <span>Đăng nhập Facebook Fake</span>
                </div>
                <div className='login-container'>
                    <form className='login-form' onSubmit={handleLogin}>
                        <input
                            type='text'
                            placeholder='Tên đăng nhập'
                            required
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        {usernameError && <p className='error-message'>{usernameError}</p>}
                        <div className='password-container'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Mật khẩu'
                                required
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        {passwordError && <p className='error-message'>{passwordError}</p>}
                        <button type='submit'>Đăng nhập</button>
                    </form>
                    <button className='btn-show-hide-password' onClick={togglePasswordVisibility}>
                        {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                    </button>
                    <p onClick={resetPage}>Quên mật khẩu ?</p>
                </div>
                <div className='login-footer'>
                    <div className='line'>
                        <span>hoặc</span>
                    </div>
                    <button onClick={registerPage}>Tạo tài khoản mới</button>
                </div>
            </div>
            {message && <AlertSuccess message={message} />}
            {error && <AlertError message={error} />}
        </div>
    );
}

export default Login;
