const { v4: uuidv4 } = require('uuid');

/**
 * Generate a unique ID for a task.
 * @returns {string}
 */
const generateId = () => uuidv4();

module.exports = generateId;
