const Joi = require('joi');

const UserErrorCode = {
  CREATE_NEW_USER_ERROR: 'CREATE_NEW_USER_ERROR',
  USER_NOT_FOUND_ERROR: 'USER_NOT_FOUND_ERROR',
  USER_UPDATE_ERROR: 'USER_UPDATE_ERROR',
  USER_DELETED_ERROR: 'USER_DELETED_ERROR',
  GET_USERS_ERROR: 'GET_USERS_ERROR'
};

const userSchema = Joi.object({
  id: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  deleted: Joi.boolean().required(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required()
});

const createUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required()
});

module.exports = {
  UserErrorCode,
  userSchema,
  createUserSchema
};
