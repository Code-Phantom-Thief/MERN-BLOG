const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			maxlength: 50,
		},
		image: {
			type: String,
			trim: true,
			default:
				'https://images.unsplash.com/photo-1612698093158-e07ac200d44e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
		},
		description: {
			type: String,
			required: true,
			trim: true,
			maxlength: 30000,
		},
		comments: {
			type: Array,
			trim: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Blog', BlogSchema);
