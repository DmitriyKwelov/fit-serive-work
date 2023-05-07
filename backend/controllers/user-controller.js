const userService = require('../service/user-service');

class UserController {
    async registration(req, res) {
        try {
            const {username, password} = req.body;
            const userData = await userService.registration(username, password, 'admin');
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    }
    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            res.status(400).json({
                message: "ошибка при авторизации"
            })
        }
    }
    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            res.status(400).json({
                message: "ошибка при авторизации"
            })
        }
    }
}




module.exports = new UserController();