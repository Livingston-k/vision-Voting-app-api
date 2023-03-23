'use strict';
const Joi = require('joi');
const models = require('../models')
// MODELS
const User = models.User
const Position = models.Position
const Candidate = models.Candidate
// CREATE USER
const Index = async(req, res) => {
    const user = await User.count()
    const positions = await Position.count()
    const candidates = await Candidate.count()
    const votes = 0
    return res.status(200).send({user,positions,candidates,votes});

}


module.exports = {
    Index
}