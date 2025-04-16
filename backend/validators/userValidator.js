// validators/userValidator.js
const { body } = require('express-validator');

exports.validateCreateUser = [
    body('name')
        .isString().withMessage('Name must be a string.')
        .matches(/^[A-Za-z\s]+$/).withMessage('Name must contain only letters.'),

    body('email')
        .isEmail().withMessage('Invalid email format.'),

    body('password')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter.')
        .matches(/\d/).withMessage('Password must contain at least one number.')
        .matches(/[@$!%*?&]/).withMessage('Password must contain at least one special character.'),

    body('role')
        .isIn(['admin', 'user']).withMessage('Role must be admin or user')
];

exports.validateUpdateUser = [
    body('name')
        .optional()
        .isString().withMessage('Name must be a string.')
        .matches(/^[A-Za-z\s]+$/).withMessage('Name must contain only letters.'),

    body('password')
        .optional()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter.')
        .matches(/\d/).withMessage('Password must contain at least one number.')
        .matches(/[@$!%*?&]/).withMessage('Password must contain at least one special character.')
];
