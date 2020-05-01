const Task = require('../model/task')
exports.tasks_get_all = async (req, res, next) => {
    try {
        let tasks = await Task.find().populate('user', 'username')
        res.status(200).json({
            tasks: tasks
        })
    } catch (err) {
        return res.status(400).json(err)
    }
}