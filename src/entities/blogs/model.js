const Joi = require('joi');

module.exports = {
  blogId: Joi.string().length(24),
  newBlog: Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required()
  }),
  updateBlog: Joi.object().keys({
    title: Joi.string(),
    body: Joi.string()
  })
};