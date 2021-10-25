const User = require('../models/User');
const Admin = require('../models/Admin');

const {
	signupSchema,
	loginSchema,
} = require('../middleware/joi_validation');

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;

const createToken = (id) => {
	return jwt.sign({ id }, JWT_SECRET, { expiresIn: '6h' });
};

const createAdminToken = (id) => {
	return jwt.sign({ id }, JWT_ADMIN_SECRET, {
		expiresIn: '2h',
	});
};

exports.signup = async (req, res) => {
	try {
		const {
			username,
			email,
			password,
			confirmPassword,
			avatar,
		} = await signupSchema.validateAsync(req.body);

		const existUsername = await User.findOne({
			username,
		});

		if (existUsername) {
			return res.status(409).json({
				message:
					'Username is already used. Please try another name',
			});
		}

		const existEmail = await User.findOne({
			email,
		});

		if (existEmail) {
			return res.status(409).json({
				message: 'You are already registerd. Please login',
			});
		}

		if (password !== confirmPassword) {
			return res
				.status(400)
				.json({ message: 'Password does not match.' });
		}

		const normalUser = new User({
			username,
			email,
			password,
			avatar,
		});
		await normalUser.save();

		const token = createToken(normalUser._id);
		res.cookie('comment', token, {
			httpOnly: true,
			maxAge: 6 * 60 * 60 * 1000,
			secure: process.env.NODE_ENV !== 'development',
		});

		res
			.status(201)
			.json({ message: 'Registration completed.' });
	} catch (error) {
		return res.status(403).json({ message: error.message });
	}
};

exports.signupAdmin = async (req, res) => {
	try {
		const {
			username,
			email,
			password,
			confirmPassword,
			avatar,
		} = await signupSchema.validateAsync(req.body);

		const existUsername = await Admin.findOne({
			username,
		});

		if (existUsername) {
			return res.status(409).json({
				message:
					'Username is already used. Please try another name',
			});
		}

		const existEmail = await Admin.findOne({
			email,
		});

		if (existEmail) {
			return res.status(409).json({
				message: 'You are already registerd. Please login',
			});
		}

		if (password !== confirmPassword) {
			return res
				.status(400)
				.json({ message: 'Password does not match.' });
		}

		const adminUser = new Admin({
			username,
			email,
			password,
			avatar,
		});
		await adminUser.save();

		const token = createToken(adminUser._id);
		const adminToken = createAdminToken(adminUser._id);

		res.cookie('jwt', adminToken, {
			httpOnly: true,
			maxAge: 6 * 60 * 60 * 1000,
			secure: process.env.NODE_ENV !== 'development',
		});

		res.cookie('comment', token, {
			httpOnly: true,
			maxAge: 6 * 60 * 60 * 1000,
			secure: process.env.NODE_ENV !== 'development',
		});

		res
			.status(201)
			.json({ message: 'Registration completed.' });
	} catch (error) {
		return res.status(403).json({ message: error.message });
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } =
			await loginSchema.validateAsync(req.body);

		const adminUser = await User.findOne({
			email,
		});

		if (!adminUser) {
			return res.status(401).json({
				message:
					'Invalid Email or Password. Please try again',
			});
		}

		const isMatchPassword = await adminUser.comparePassword(
			password
		);

		if (isMatchPassword) {
			const token = createToken(adminUser._id);

			res.cookie('comment', token, {
				httpOnly: true,
				maxAge: 6 * 60 * 60 * 1000,
				secure: process.env.NODE_ENV !== 'development',
			});

			return res
				.status(201)
				.json({ message: 'Login succeeded.' });
		} else {
			return res.status(400).json({
				message:
					'Invalid Email or Password. Please try again',
			});
		}
	} catch (error) {
		return res.status(403).json({
			message:
				'Invalid Email or Password. Please try again',
		});
	}
};

exports.loginAdmin = async (req, res) => {
	try {
		const { email, password } =
			await loginSchema.validateAsync(req.body);

		const adminUser = await Admin.findOne({
			email,
		});

		if (!adminUser) {
			return res.status(401).json({
				message:
					'Invalid Email or Password. Please try again',
			});
		}

		const isMatchPassword = await adminUser.comparePassword(
			password
		);

		if (isMatchPassword) {
			const token = createToken(adminUser._id);
			const adminToken = createAdminToken(adminUser._id);

			res.cookie('jwt', adminToken, {
				httpOnly: true,
				maxAge: 6 * 60 * 60 * 1000,
				secure: process.env.NODE_ENV !== 'development',
			});

			res.cookie('comment', token, {
				httpOnly: true,
				maxAge: 6 * 60 * 60 * 1000,
				secure: process.env.NODE_ENV !== 'development',
			});

			return res
				.status(201)
				.json({ message: 'Login succeeded.' });
		} else {
			return res.status(400).json({
				message:
					'Invalid Email or Password. Please try again',
			});
		}
	} catch (error) {
		return res.status(403).json({
			message:
				'Invalid Email or Password. Please try again',
		});
	}
};

exports.loggedIn = async (req, res) => {
	const token = req.cookies.comment;
	try {
		if (token) {
			jwt.verify(token, JWT_SECRET, (err) => {
				if (err) {
					return res.json(false);
				} else {
					return res.json(true);
				}
			});
		} else {
			return res.json(false);
		}
		
	} catch (error) {
		return res.json(false);
	}

};

exports.loggedInAdmin = async (req, res) => {
	const adminToken = req.cookies.jwt;

	try {
		if (adminToken) {
			jwt.verify(adminToken, JWT_ADMIN_SECRET, (err) => {
				if (err) {
					return res.json(false);
				} else {
					return res.json(true);
				}
			});
		} else {
			return res.json(false);
		}
		
	} catch (error) {
		return res.json(false);
	}

};

exports.logout = async (req, res) => {
	try {
		res.cookie('jwt', '', {
			httpOnly: true,
			expires: new Date(0),
		});
		res.cookie('comment', '', {
			httpOnly: true,
			expires: new Date(0),
		});
		return res
			.status(201)
			.json({ message: 'Logout succeeded.' });
	} catch (error) {
		res.status(401).json({ message: error.message });
	}
};
