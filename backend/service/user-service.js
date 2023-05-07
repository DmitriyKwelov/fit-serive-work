const UserModel = require('../models/user-model');
const UserDto = require('../dtos/user-dto')
const bcrypt = require('bcrypt')
const tokenService = require('./token-service')
const ApiError = require('../exceptions/api-error')
const jwt = require('jsonwebtoken');


class UserService {
    async registration(username, password, role) {
        const lowUsername = username.toLowerCase();
        const candidateWithUsername = await UserModel.findOne({username: lowUsername})
        if (candidateWithUsername){
            throw new Error(`Пользователь с таким username ${lowUsername} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await UserModel.create({username: lowUsername, password: hashPassword, role})
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }
    async login(email, password) {
        const user = await UserModel.findOne({username: email})
        if(!user){
            throw new Error(`Неверный логин или пароль`)
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals) {
            throw new Error(`Неверный логин или пароль`)
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }
    async refresh(refreshToken){
        if(!refreshToken){
            throw new Error(`Нет refreshToken`);
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDb){
            throw new Error(`Ошибка refreshToken`);
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }
}


module.exports = new UserService();