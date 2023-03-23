'use strict';
const models = require('../models')
// MODELS
const Candidate = models.Candidate
const Position = models.Position
// CREATE USER
const Index = async(req, res) => {
    const page = parseInt(req.query.page) || 1; // current page number
    const limit = parseInt(req.query.limit) || 10; // number of items per page
    const offset = (page - 1) * limit; // offset of the first item to return
    const votes = await Position.findAll({
            limit,
            offset,
        include: {
            model: Candidate,
            as: 'candidates'
        }
    });
    const totalPages = Math.ceil(votes.count / limit); // total number of pages
    return res.status(200).send({
        data: votes.rows,
        page,
        limit,
        totalPages,
        totalCount: votes.count,
    });
}
const Show = (req, res) => {

}
const Store = (req, res) => {

}
const Edit = (req, res) => {

}

module.exports = {
    Index,
    Show,
    Edit,
    Store
}