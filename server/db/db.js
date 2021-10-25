const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const MongoDB = async () => {
	try {
		await mongoose.connect(MONGO_URI);
		console.log('MongoDB is connecting');
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = MongoDB;
