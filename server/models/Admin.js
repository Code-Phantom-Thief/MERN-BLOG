const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const AdminSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			maxlength: 50,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			maxlength: 200,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			maxlength: 2000,
		},
		avatar: {
			type: String,
			default:
				'https://images.unsplash.com/photo-1517649281203-dad836b4abe5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
		},
	},
	{ timestamps: true }
);

AdminSchema.pre('save', async function (next) {
	this.password = await bcrypt.hash(this.password, 12);
	next();
});

AdminSchema.methods.comparePassword = async function (
	enteredPassword
) {
	return await bcrypt.compare(
		enteredPassword,
		this.password
	);
};

module.exports = mongoose.model('Admin', AdminSchema);
