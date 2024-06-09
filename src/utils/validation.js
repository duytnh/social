export const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z]+$/;
    if (!usernameRegex.test(username)) {
        return 'Tên đăng nhập không chứa khoảng trắng, số hay ký tự đặc biệt';
    }
    return '';
};

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return 'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt và từ 8 ký tự trở lên.';
    }
    return '';
};

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Email không hợp lệ. Vui lòng nhập địa chỉ email hợp lệ.';
    }
    return '';
};
