import React, { useEffect, useState } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import apiUser from '../../../services/UserService';
import AlertSuccess from '../../../components/Alert/AlertSuccess';
import AlertError from '../../../components/Alert/AlertError';
import { validatePassword } from '../../../utils/validation';

function ChangePassword() {
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
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
    }, [message, error, passwordError]);

    const changePassword = async (e) => {
        e.preventDefault();
        const passwordValidationError = validatePassword(password);

        if (passwordValidationError) {
            setPasswordError(passwordValidationError);
            return;
        }

        try {
            const response = await apiUser.changePassword(code, password);
            if (response.data.status === 200) {
                setMessage(response.data.message);
                localStorage.setItem('selectedPage', 'login');
                const savedPage = localStorage.getItem('selectedPage');
                savedPage ? navigate(`/${savedPage}`) : navigate('/');
                setCode('');
                setPassword('');
            } else if (response.data.status === 400) {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
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
        <div className='changepassword'>
            <p className='logo-app'>facebook fake</p>
            <div className='changepassword-box'>
                <div className='changepassword-header'>
                    <span>Thay đổi mật khẩu</span>
                </div>
                <div className='changepassword-container'>
                    <form className='changepassword-form' onSubmit={changePassword}>
                        <input
                            type='text'
                            placeholder='Mã xác nhận'
                            required
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Mật khẩu'
                            required
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {passwordError && <p className='error-message'>{passwordError}</p>}
                        <button type='submit'>Thay đổi</button>
                    </form>
                    <button className='btn-show-hide-password' onClick={togglePasswordVisibility}>
                        {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i>}
                    </button>
                </div>
                <div className='changepassword-footer'>
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

export default ChangePassword;
