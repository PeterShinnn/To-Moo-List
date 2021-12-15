const csrf = require('csurf');
const { check, validationResult } = require('express-validator');

const csrfProtection = csrf({ cookie: true });
const db = require('./db/models')

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

const listNotFoundError = (id) => {
    const err = new Error(`This list id: ${id} could not be found`)
    err.title = "List not found.";
    err.status = 400;
    return err;
};


const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map((error) => error.msg);

        const err = Error("Bad request.");
        err.errors = errors;
        err.status = 400;
        err.title = "Bad request.";
        next(err);
    }
    next();
};

const validateList = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage("There must be a name for a list."),
    check('name')
        .isLength({ max: 50 })
        .withMessage('The name can only be 50 characters')
];

const userValidators = [
    check('username')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for username')
        .isLength({ max: 50 })
        .withMessage('Username must not be more than 50 characters long')
        .custom((value) => {
            return db.User.findOne({ where: { username: value } })
                .then((user) => {
                    if (user) {
                        return Promise.reject('The provided username is already in use by another account');
                    }
                });
        }),
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for First Name')
        .isLength({ max: 50 })
        .withMessage('First Name must not be more than 50 characters long'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Last Name')
        .isLength({ max: 50 })
        .withMessage('Last Name must not be more than 50 characters long'),
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Email Address')
        .isLength({ max: 255 })
        .withMessage('Email Address must not be more than 255 characters long')
        .isEmail()
        .withMessage('Email Address is not a valid email')
        .custom((value) => {
            return db.User.findOne({ where: { email: value } })
                .then((user) => {
                    if (user) {
                        return Promise.reject('The provided Email Address is already in use by another account');
                    }
                });
        }),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Password')
        .isLength({ max: 50 })
        .withMessage('Password must not be more than 50 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
        .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
    check('confirmPassword')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Confirm Password')
        .isLength({ max: 50 })
        .withMessage('Confirm Password must not be more than 50 characters long')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Confirm Password does not match Password');
            }
            return true;
        }),
];

const loginValidator = [
    check('username')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for username'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a valid Password')
]

module.exports = {
    csrfProtection,
    asyncHandler,
    userValidators,
    loginValidator,
    listNotFoundError,
    validateList,
    handleValidationErrors,
};