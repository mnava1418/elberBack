const login = (req, res) => {
    res.send('Login Service');
}

const logout = (req, res) => {
    res.send('Logout Service');
}

const register = (req, res) => {
    res.send('Register Service')
}

module.exports = () => {
    return {
        login,
        logout,
        register
    }
}