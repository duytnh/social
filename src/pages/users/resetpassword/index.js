import React, { useEffect, useState } from 'react';
import './style.scss';
import { useNavigate } from 'react-router-dom';
import apiUser from '../../../services/UserService';
import AlertSuccess from '../../../components/Alert/AlertSuccess';
import AlertError from '../../../components/Alert/AlertError';
import { validateEmail } from '../../../utils/validation';

function ResetPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');

    const loginPage = () => {
        navigate('/login');
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage('');
            setError('');
        }, 3000);

        return () => clearTimeout(timer);
    }, [message, error, emailError]);

    const handleSendCode = async (e) => {
        e.preventDefault();
        const emailValidationError = validateEmail(email);

        if (emailValidationError) {
            setEmailError(emailValidationError);
            return;
        }

        try {
            const response = await apiUser.sendCodePassword(email);
            if (response.data.status === 200) {
                setMessage(response.data.message);
                localStorage.setItem('selectedPage', 'change');
                const savedPage = localStorage.getItem('selectedPage');
                savedPage ? navigate(`/${savedPage}`) : navigate('/');
                setEmail('');
            } else if (response.data.status === 400) {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Máy chủ không phản hồi');
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        const validationError = validateEmail(e.target.value);
        setEmailError(validationError);
    };

    return (
        <div className='sendcode'>
            <p className='logo-app'>facebook fake</p>
            <div className='sendcode-box'>
                <div className='sendcode-header'>
                    <span>Đặt lại mật khẩu</span>
                </div>
                <div className='sendcode-container'>
                    <p>
                        Nhập email bữa đăng ký vô để đổi mật khẩu nhe. Nhập đúng tao gửi cho mã về mail vô đó lấy mã xác nhận rồi điền thông tin như mã xác nhận và mật khẩu mới vào form tiếp theo là đổi được mật khẩu rồi.
                    </p>
                    <form className='sendcode-form' onSubmit={handleSendCode}>
                        <input
                            type='text'
                            placeholder='Email'
                            required
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {emailError && <p className='error-message'>{emailError}</p>}
                        <button type='submit'>Lấy mã xác nhận</button>
                    </form>
                </div>
                <div className='sendcode-footer'>
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

export default ResetPassword;
