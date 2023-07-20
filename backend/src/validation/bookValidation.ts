import Joi from 'joi';
import validate from './validate';

const addBookSchema = Joi.object({
  author: Joi.string().required().messages({
    'any.required': 'author is required',
    'string.empty': 'author cannot be empty',
  }),

  title: Joi.string().required().messages({
    'any.required': 'title is required',
    'string.empty': 'title cannot be empty',
  }),
  description: Joi.string().required().messages({
    'any.required': 'description is required',
    'string.empty': 'description cannot be empty',
  }),
  category: Joi.string().required().messages({
    'any.required': 'category is required',
    'string.empty': 'category cannot be empty',
  }),
});
const updateBookSchema = Joi.object({
  title: Joi.string().messages({
    'string.empty': 'title cannot be empty',
  }),
  description: Joi.string().messages({
    'string.empty': 'description cannot be empty',
  }),
  category: Joi.string().messages({
    'string.empty': 'category cannot be empty',
  }),
});
const bookIdSchema = Joi.object({
  bookId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'any.required': 'mongodb id is required',
      'string.empty': 'mongodb id cannot be empty',
      'string.pattern.base': 'mongodb id must be a MongoDB ObjectId',
    }),
});
export default {
  addBookValidation: validate(addBookSchema),
  updateBookValidation: validate(updateBookSchema),
  bookIdValidation: validate(bookIdSchema, 'params'),
};
