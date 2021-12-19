const express = require('express');
const router = express.Router();
const db = require('../db/models');
const { asyncHandler, taskNotFound } = require('../utils');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// get / search
router.get('/tasks/:word(\\w+)', asyncHandler(async (req, res, next) => {
    const name = req.params.word;
    const userId = parseInt(res.locals.user.id, 10);
    console.log('?????????????', name, userId)

    const tasks = await db.Task.findAll({
        where: {
            userId,
            name: {
                [Op.iLike]: '%' + name + '%'
            }
        },
        include: [db.List, db.Category]
    });

    if (tasks) {
        res.status(200);
        res.json({ tasks });
    } else {
        next(taskNotFound())
    }
}))

module.exports = router;