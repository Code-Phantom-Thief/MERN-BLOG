const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
	{
		creator: {
			type: String,
			required: true,
			trim: true,
			maxlength: 50,
		},
		comment: {
			type: String,
			required: true,
			trim: true,
			maxlength: 1000,
		},
		avatar: {
			type: String,
			trim: true,
			default:
				'https://res.cloudinary.com/dloojl41a/image/upload/v1634937659/MERN%20BLOG/default_avatar_jn85ob.png',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);
