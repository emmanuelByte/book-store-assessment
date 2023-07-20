import Joi from 'joi';
import validate from './validate';

const registerSchema = Joi.object({
  email: Joi.string().email().min(3).max(30).required().messages({
    'string.email': 'Email must be a valid email address.',
    'string.min': 'Email must be at least 3 characters long.',
    'string.max': 'Email must be at most 30 characters long.',
    'any.required': 'Email is required.',
  }),
  password: Joi.string().required().messages({
    'any.required': 'password is required',
    'string.empty': 'password cannot be empty',
  }),
  firstName: Joi.string().required().messages({
    'any.required': 'First name is required',
    'string.empty': 'First name cannot be empty',
  }),
  lastName: Joi.string().required().messages({
    'any.required': 'Last name is required',
    'string.empty': 'Last name cannot be empty',
  }),
});
const loginSchema = Joi.object({
  email: Joi.string().email().min(3).max(30).required().messages({
    'string.email': 'Email must be a valid email address.',
    'string.min': 'Email must be at least 3 characters long.',
    'string.max': 'Email must be at most 30 characters long.',
    'any.required': 'Email is required.',
  }),
  password: Joi.string().required().messages({
    'any.required': 'password is required',
    'string.empty': 'password cannot be empty',
  }),
});
const verifyEmailSchema = Joi.object({
  email: Joi.string().email().min(3).max(30).required().messages({
    'string.email': 'Email must be a valid email address.',
    'string.min': 'Email must be at least 3 characters long.',
    'string.max': 'Email must be at most 30 characters long.',
    'any.required': 'Email is required.',
  }),
  // code property 4 digit number
  code: Joi.number().integer().min(1000).max(9999).required().messages({
    'number.base': 'Code must be a number.',
    'number.integer': 'Code must be an integer.',
    'number.min': 'Code must be at least 1000.',
    'number.max': 'Code must be at most 9999.',
    'any.required': 'Code is required.',
  }),
});

const verifyForgotEmailSchema = Joi.object({
  email: Joi.string().email().min(3).max(30).required().messages({
    'string.email': 'Email must be a valid email address.',
    'string.min': 'Email must be at least 3 characters long.',
    'string.max': 'Email must be at most 30 characters long.',
    'any.required': 'Email is required.',
  }),
  // code property 4 digit number
  code: Joi.number().integer().min(1000).max(9999).required().messages({
    'number.base': 'Code must be a number.',
    'number.integer': 'Code must be an integer.',
    'number.min': 'Code must be at least 1000.',
    'number.max': 'Code must be at most 9999.',
    'any.required': 'Code is required.',
  }),
  password: Joi.string().required().messages({
    'any.required': 'password is required',
    'string.empty': 'password cannot be empty',
  }),
});

const verificationEmailSchema = Joi.object({
  email: Joi.string().email().min(3).max(30).required().messages({
    'string.email': 'Email must be a valid email address.',
    'string.min': 'Email must be at least 3 characters long.',
    'string.max': 'Email must be at most 30 characters long.',
    'any.required': 'Email is required.',
  }),
});

export default {
  loginValidation: validate(loginSchema),
  verificationEmailValidation: validate(verificationEmailSchema),
  verifyEmailValidation: validate(verifyEmailSchema),
  verifyForgotEmailValidation: validate(verifyForgotEmailSchema),
  registerValidation: validate(registerSchema),
};
