'use strict';
const Joi = require('joi');
const models = require('../models')
// MODELS
const User = models.User
const Category = models.Category
const Candidate = models.Candidate
// CREATE USER
const Index = async(req, res) => {
    const user = await User.count()
    const categories = await Category.count()
    const candidates = await Candidate.count()
    const votes = 0
    return res.status(200).send({user,categories,candidates,votes});

}


module.exports = {
    Index
}