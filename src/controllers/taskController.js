const generateId = require('../utils/generateId');

const tasks = [];

/**
 * Create an HTTP error object.
 * @param {number} status HTTP status code.
 * @param {string} message Error message.
 * @returns {Error & {status: number}}
 */
const createHttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

/**
 * Ensure request body is a valid JSON object.
 * @param {unknown} body Parsed request body.
 * @returns {void}
 */
const ensureObjectBody = (body) => {
  if (!body || Array.isArray(body) || typeof body !== 'object') {
    throw createHttpError(400, 'Request body must be a JSON object');
  }
};

/**
 * Validate and normalize incoming title field.
 * @param {unknown} title Raw title value from request body.
 * @returns {string}
 */
const normalizeTitle = (title) => {
  if (typeof title !== 'string' || title.trim().length === 0) {
    throw createHttpError(400, 'Title is required');
  }

  return title.trim();
};

/**
 * Find a task index by ID.
 * @param {string} id Task ID.
 * @returns {number}
 */
const findTaskIndexById = (id) => tasks.findIndex((task) => task.id === id);

/**
 * Create a new task.
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 * @param {import('express').NextFunction} next Express next middleware function.
 * @returns {Promise<void>}
 */
const createTask = async (req, res, next) => {
  try {
    ensureObjectBody(req.body);

    const { title, description = '' } = req.body;

    if (typeof description !== 'string') {
      throw createHttpError(400, 'Description must be a string');
    }

    const task = {
      id: generateId(),
      title: normalizeTitle(title),
      description,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    tasks.push(task);

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

/**
 * Get all tasks, with optional filtering and sorting.
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 * @param {import('express').NextFunction} next Express next middleware function.
 * @returns {Promise<void>}
 */
const getTasks = async (req, res, next) => {
  try {
    const { status, sort } = req.query;
    let result = [...tasks];

    if (status) {
      if (status !== 'pending' && status !== 'done') {
        throw createHttpError(400, 'Invalid status filter. Use pending or done');
      }
      result = result.filter((task) => task.status === status);
    }

    if (sort === 'createdAt') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Get a task by ID.
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 * @param {import('express').NextFunction} next Express next middleware function.
 * @returns {Promise<void>}
 */
const getTaskById = async (req, res, next) => {
  try {
    const task = tasks.find((item) => item.id === req.params.id);

    if (!task) {
      throw createHttpError(404, 'Task not found');
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

/**
 * Update task title and/or description.
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 * @param {import('express').NextFunction} next Express next middleware function.
 * @returns {Promise<void>}
 */
const updateTask = async (req, res, next) => {
  try {
    ensureObjectBody(req.body);

    const { title, description } = req.body;
    const hasTitle = Object.prototype.hasOwnProperty.call(req.body, 'title');
    const hasDescription = Object.prototype.hasOwnProperty.call(req.body, 'description');

    if (!hasTitle && !hasDescription) {
      throw createHttpError(400, 'Request body must include title or description');
    }

    const taskIndex = findTaskIndexById(req.params.id);

    if (taskIndex === -1) {
      throw createHttpError(404, 'Task not found');
    }

    if (hasTitle) {
      tasks[taskIndex].title = normalizeTitle(title);
    }

    if (hasDescription) {
      if (typeof description !== 'string') {
        throw createHttpError(400, 'Description must be a string');
      }
      tasks[taskIndex].description = description;
    }

    res.status(200).json(tasks[taskIndex]);
  } catch (error) {
    next(error);
  }
};

/**
 * Mark a task as done.
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 * @param {import('express').NextFunction} next Express next middleware function.
 * @returns {Promise<void>}
 */
const markTaskAsDone = async (req, res, next) => {
  try {
    const taskIndex = findTaskIndexById(req.params.id);

    if (taskIndex === -1) {
      throw createHttpError(404, 'Task not found');
    }

    if (tasks[taskIndex].status === 'done') {
      throw createHttpError(400, 'Task is already completed');
    }

    tasks[taskIndex].status = 'done';

    res.status(200).json(tasks[taskIndex]);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete a task by ID.
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 * @param {import('express').NextFunction} next Express next middleware function.
 * @returns {Promise<void>}
 */
const deleteTask = async (req, res, next) => {
  try {
    const taskIndex = findTaskIndexById(req.params.id);

    if (taskIndex === -1) {
      throw createHttpError(404, 'Task not found');
    }

    tasks.splice(taskIndex, 1);

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  markTaskAsDone,
  deleteTask
};
