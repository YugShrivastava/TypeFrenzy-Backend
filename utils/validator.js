const validateEmail = (email) => {
    const emailPattern = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
    return emailPattern.test(email);
}

const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
}

export {
    validateEmail,
    validatePassword,
}