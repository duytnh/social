import React, { useEffect, useState } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import AlertSuccess from '../../../components/Alert/AlertSuccess';
import AlertError from '../../../components/Alert/AlertError';
import apiUser from '../../../services/UserService';
import { validateUsername, validatePassword, validateEmail } from '../../../utils/validation';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const loginPage = () => {
        navigate('/login');
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage('');
            setError('');
        }, 3000);

        return () => clearTimeout(timer);
    }, [message, error]);

    const handleRegister = async (e) => {
        e.preventDefault();
        const usernameValidationError = validateUsername(username);
        const emailValidationError = validateEmail(email);
        const passwordValidationError = validatePassword(password);

        if (usernameValidationError || emailValidationError || passwordValidationError) {
            setUsernameError(usernameValidationError);
            setEmailError(emailValidationError);
            setPasswordError(passwordValidationError);
            return;
        }

        try {
            const response = await apiUser.RegisterUser(username, password, email);
            if (response.data.status === 200) {
                setMessage(response.data.message);
                setEmail('');
                setPassword('');
                setUsername('');
            } else if (response.data.status === 400) {
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

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        const validationError = validateEmail(e.target.value);
        setEmailError(validationError);
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
        <div className='register'>
            <p className='logo-app'>facebook fake</p>
            <div className='register-box'>
                <div className='register-header'>
                    <span>Đăng ký Facebook Fake</span>
                </div>
                <div className='register-container'>
                    <form className='register-form' onSubmit={handleRegister}>
                        <input
                            type='text'
                            placeholder='Tên đăng nhập'
                            required
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        {usernameError && <p className='error-message'>{usernameError}</p>}
                        <input
                            type='text'
                            placeholder='Email'
                            required
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {emailError && <p className='error-message'>{emailError}</p>}
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Mật khẩu'
                            required
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {passwordError && <p className='error-message'>{passwordError}</p>}
                        <button type='submit'>Đăng ký</button>
                    </form>
                    <button className='btn-show-hide-password' onClick={togglePasswordVisibility}>
                        {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                    </button>
                </div>
                <div className='register-footer'>
                    <div className='line mt-4'>
                        <span>hoặc</span>
                    </div>
                    <button onClick={loginPage}>Đăng nhập</button>
                </div>
            </div>
            {message && <AlertSuccess message={message} />}
            {error && <AlertError message={error} />}
        </div>
    );
}

export default Register;
