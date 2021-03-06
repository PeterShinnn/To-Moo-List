const db = require('../../db/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get
async function getTaskByPk(taskId) {
    return await db.Task.findByPk(taskId, {
        include: [db.Priority]
    });
}

async function getTaskByPkAndUser(taskId, userId) {
    return await db.Task.findByPk(taskId, {
        where: userId,
        include: [db.List, db.Priority]
    });
}

async function getTasksByUser(userId) {
    return await db.Task.findAll({
        where: { userId },
        include: [db.List, db.Priority]
    });
}

async function getTasksByDate(lessThanDate, greaterThanDate, userId) {
    return await db.Task.findAll({
        where: {
            userId: userId,
            deadline: {
                [Op.lt]: lessThanDate,
                [Op.gt]: greaterThanDate
            }
        },
        include: [db.List, db.Priority]
    })
}

// Post
async function createTask(name, userId, listId) {
    return await db.Task.create({
        name,
        userId,
        listId,
        priorityId: 4
    });
}

// Put/Patch
async function updateTask(task, requestBody) {
    const { name, description, listId, deadline, isCompleted, priorityId } = requestBody;

    return await task.update({
        name,
        description,
        listId,
        deadline,
        isCompleted,
        priorityId
    });
}

// Destroy
async function deleteTask(task) {
    await task.destroy();
}

module.exports = {
    getTaskByPk,
    getTaskByPkAndUser,
    getTasksByUser,
    getTasksByDate,
    createTask,
    updateTask,
    deleteTask
}
