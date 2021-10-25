const Joi = require('joi');

const signupSchema = Joi.object({
	username: Joi.string()
		.max(50)
		.trim()
		.required()
		.messages({
			'string.base': `"username" should be a type of 'text'`,
			'string.empty': `"username" cannot be an empty field`,
			'string.max': `"username" should have a maximum length of 50`,
			'any.required': `"username" is a required field`,
		}),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ['com', 'net'] },
		})
		.trim()
		.lowercase()
		.max(200)
		.required()
		.messages({
			'string.base': `"email" should be a type of 'text'`,
			'string.empty': `"email" cannot be an empty field`,
			'string.max': `"email" should have a maximum length of 200`,
			'any.required': `"email" is a required field`,
		}),
	password: Joi.string().trim().min(6).required().messages({
		'string.base': `"password" should be a type of 'text'`,
		'string.empty': `"password" cannot be an empty field`,
		'string.min': `"password" should have a minimum length of 6`,
		'any.required': `"password" is a required field`,
	}),
	confirmPassword: Joi.string()
		.trim()
		.min(6)
		.required()
		.messages({
			'string.base': `"confirm password" should be a type of 'text'`,
			'string.empty': `"confirm password" cannot be an empty field`,
			'string.min': `"confirm password" should have a minimum length of 6`,
			'any.required': `"confirm password" is a required field`,
		}),
	avatar: Joi.string().trim(),
});

const loginSchema = Joi.object({
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ['com', 'net'] },
		})
		.trim()
		.lowercase()
		.max(200)
		.required()
		.messages({
			'string.base': `"email" should be a type of 'text'`,
			'string.empty': `"email" cannot be an empty field`,
			'string.max': `"email" should have a maximum length of 200`,
			'any.required': `"email" is a required field`,
		}),
	password: Joi.string().trim().min(6).required().messages({
		'string.base': `"password" should be a type of 'text'`,
		'string.empty': `"password" cannot be an empty field`,
		'string.min': `"password" should have a minimum length of 6`,
		'any.required': `"password" is a required field`,
	}),
});

const blogSchema = Joi.object({
	title: Joi.string().max(50).trim().required().messages({
		'string.base': `"title" should be a type of 'text'`,
		'string.empty': `"title" cannot be an empty field`,
		'string.max': `"title" should have a maximum length of 50`,
		'any.required': `"title" is a required field`,
	}),
	description: Joi.string()
		.max(30000)
		.trim()
		.required()
		.messages({
			'string.base': `"description" should be a type of 'text'`,
			'string.empty': `"description" cannot be an empty field`,
			'string.max': `"description" should have a maximum length of 30000`,
			'any.required': `"description" is a required field`,
		}),
	image: Joi.string().trim(),
});

module.exports = { signupSchema, loginSchema, blogSchema};
