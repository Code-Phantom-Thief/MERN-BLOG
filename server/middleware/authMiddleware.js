const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET;

const requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(
			token,
			JWT_ADMIN_SECRET,
			(err, decodedToken) => {
				if (err) {
					res.status(401).json({
						message:
							'This is protect route. You are not allowed to enter',
					});
				} else {
					req.id = decodedToken;
					next();
				}
			}
		);
	} else {
		res
			.status(401)
			.json({
				message:
					'This is protect route. You are not allowed to enter',
			});
	}
};

const requireComment = (req, res, next) => {
	const token = req.cookies.comment;
	if (token) {
		jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
			if (err) {
				res.status(401).json({
					message:
						'This is protect route. You are not allowed to enter',
				});
			} else {
				req.id = decodedToken;
				next();
			}
		});
	} else {
		res
			.status(401)
			.json({
				message:
					'This is protect route. You are not allowed to enter',
			});
	}
};

module.exports = {requireAuth, requireComment};
