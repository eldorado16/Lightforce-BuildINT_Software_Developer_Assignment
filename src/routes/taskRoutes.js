const express = require('express');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  markTaskAsDone,
  deleteTask
} = require('../controllers/taskController');

const router = express.Router();

const methodNotAllowed = (req, res) => {
  res.status(405).json({ error: 'Method Not Allowed' });
};

router.route('/')
  .post(createTask)
  .get(getTasks)
  .all(methodNotAllowed);

router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask)
  .all(methodNotAllowed);

router.route('/:id/done')
  .patch(markTaskAsDone)
  .all(methodNotAllowed);

module.exports = router;
