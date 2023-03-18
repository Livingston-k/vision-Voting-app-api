'use strict';
const Joi = require('joi');
const models = require('../models')
// MODELS
const Position = models.Position
// CREATE USER
const Index = async (req, res) => {
    const page = parseInt(req.query.page) || 1; // current page number
    const limit = parseInt(req.query.limit) || 10; // number of items per page
    const offset = (page - 1) * limit; // offset of the first item to return

    const position = await Position.findAndCountAll({
        limit,
        offset,
    });
    const totalPages = Math.ceil(position.count / limit); // total number of pages
    return res.status(200).send({
        data: position.rows,
        page,
        limit,
        totalPages,
        totalCount: position.count,
    });
}
const Show = async (req, res) => {
    const id = req.params.id
    const user = await Position.findByPk(id);
    return res.status(200).send(user);
}
const Store = async (req, res) => {
    try {
        const schema = Joi.object({
            name: Joi.string().max(100).required(),
            description: Joi.string().required(),
            maxVotes: Joi.required(),
            priority: Joi.required(),
        });
        const { error } = schema.validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });
        const existingPosition = await Position.findOne({ where: { name: req.body.name } });
        if (existingPosition) return res.status(409).send({ message: `Position ${req.body.name} already exists` });

        const newPosition = await Position.create({
            name: req.body.name,
            description: req.body.description,
            maxVotes: req.body.maxVotes,
            priority: req.body.priority,
        });
        res.status(200).send({
            message: `Position ${req.body.name} created successfully`,
            position: newPosition
        });
    } catch (error) {
        res.status(500).send({ message: 'Error creating Position', error });
    }
}

const Edit = async (req, res) => {
    const id = req.params.id
    // try {
    const schema = Joi.object({
        name: Joi.string().max(100).required(),
        description: Joi.string().required(),
        maxVotes: Joi.required(),
        priority: Joi.required(),
    });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
    const user = await Position.findByPk(id);
    if (!user) return res.status(404).send({ message: `Position with id ${id} not found` });
    const editedPosition = await Position.update({
        name: req.body.name,
        description: req.body.description,
        maxVotes: req.body.maxVotes,
        priority: req.body.priority,
    }, {
        where: {
            id
        }
    });
    return res.status(200).send({
        message: `Position ${req.body.name} edited successfully`,
    });
    // } catch (error) {
    //     res.status(500).send({ message: 'Error editing Position', error });
    // }
}

const Destroy = async (req, res) => {
    try {
        const id = req.params.id
        await Position.destroy({
            where: {
                id
            }
        });
        return res.status(200).send({ message: 'Position Deleted Successfully' });
    } catch (error) {
        return res.status(500).send({ message: 'Error deleting position' });
    }


}

module.exports = {
    Index,
    Show,
    Edit,
    Store,
    Destroy
}