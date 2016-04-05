const Joi = require('joi');

module.exports = {
  userId: Joi.string().length(24),
  newUser: Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    email: Joi.string().email().required()
  }),
  updateUser: Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email()
  })
};