const Joi = require('joi');

const idSchema = Joi.object({
  id: Joi.string().required()
});

const authHeaderSchema = Joi.object({
  authorization: Joi.string().required()
});

module.exports = {
  idSchema,
  authHeaderSchema
};
