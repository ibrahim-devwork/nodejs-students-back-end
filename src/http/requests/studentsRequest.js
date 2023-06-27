const { body, check, param, validationResult } = require('express-validator');

const getAllStudentsValidator = [
    body('page').notEmpty().withMessage('The number of page is required').isNumeric().withMessage('The number of pages must be numeric'),
    body('pageSize').notEmpty().withMessage('The size of pages is required').isNumeric().withMessage('The size of pages must be numeric'),
    body('search').optional(),
    
    (request, ressponse, next) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
        return ressponse.status(422).json({ errors: errors.array() });
        }

        next();
    }
];

const createStudentValidator = [
    body('firstname').notEmpty().withMessage('The firstname is required').isLength({ max: 50 }).withMessage('firstname must not exceed 50 characters'),
    body('lastName').notEmpty().withMessage('The lastName is required').isLength({ max: 50 }).withMessage('lastName must not exceed 50 characters'),
    body('dateOfBirth').notEmpty().withMessage('The dateOfBirth is required').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Invalid date of birth format (YYYY-MM-DD)'),
    body('email').notEmpty().withMessage('The email is required').isLength({ max: 50 }).withMessage('email must not exceed 50 characters'),
    
    (request, ressponse, next) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
        return ressponse.status(422).json({ errors: errors.array() });
        }

        next();
    }
];

const updateStudentValidator = [
    body('firstname').notEmpty().withMessage('The firstname is required').isLength({ max: 50 }).withMessage('firstname must not exceed 50 characters'),
    body('lastName').notEmpty().withMessage('The lastName is required').isLength({ max: 50 }).withMessage('lastName must not exceed 50 characters'),
    body('dateOfBirth').notEmpty().withMessage('The dateOfBirth is required').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Invalid date of birth format (YYYY-MM-DD)'),
    body('email').notEmpty().withMessage('The email is required').isLength({ max: 50 }).withMessage('email must not exceed 50 characters'),
    
    (request, ressponse, next) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
        return ressponse.status(422).json({ errors: errors.array() });
        }

        next();
    }
];

module.exports = {
    getAllStudentsValidator,
    createStudentValidator,
    updateStudentValidator
}