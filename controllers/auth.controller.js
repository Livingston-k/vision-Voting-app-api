'use strict';
const bcrypt = require('bcrypt');
const Joi = require('joi');
const models = require('../models')
const AuthTokenHelper = require('../helpers/tokenGenerator')
const RandomCodeHelper = require('../helpers/radomcodeGenerator')
// MODELS
const User = models.User
// CREATE USER

const Register = async (req, res) => {
    try {
        const schema = Joi.object({
            fullName: Joi.string().max(100).required(),
            phone: Joi.string().max(100).required(),
            email: Joi.string().email().max(100).required(),
            password: Joi.string().min(6).required(),
            confirm_password: Joi.string().min(6).required(),
            countryId: Joi.required(),
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const image = "default.png";
        const { fullName, email, phone, countryId, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) return res.status(409).send({ message: 'User with this email already exists' });
        const code = await RandomCodeHelper.generateCode(8)
        const newUser = await User.create({ code, fullName, email, phone, image, countryId, password: hashedPassword, });
        res.status(200).send({
            message: `User ${newUser.fullName} registered successfully`,
            user: {
                'id': newUser.id,
                'fullName': newUser.fullName,
                'email': newUser.email,
                'isActive': newUser.isActive,
                'phone': newUser.phone,
            }
        });
    } catch (error) {
        res.status(500).send({ message: 'Error creating user', error });
    }
};
// USER LOGIN
const Login = async (req, res) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send({ 'msg': error.details[0].message });
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) return res.status(404).send({ 'msg': 'Invalid credentials' });
        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) return res.status(404).send({ 'msg': 'Invalid credentials' });
        const token = await AuthTokenHelper.GenerateToken(user)
        return res.status(200).send({
            'msg': `User ${user.fullName} authenticated successfully`,
            'token': token,
            "user": { "id": user.id, "name": user.fullName, "phone": user.phone,"type": user.userType, "email": user.email, "isActive": true  },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ 'msg': 'Server error', });
    }
};

module.exports = {
    Register,
    Login,
}