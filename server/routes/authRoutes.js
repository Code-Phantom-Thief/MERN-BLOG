const router = require('express').Router();
const {
	signup,
	signupAdmin,
	login,
	loginAdmin,
	loggedIn,
	loggedInAdmin,
	logout
} = require('../controllers/authController');

router.post('/signup', signup);
router.post('/signup/admin', signupAdmin);
router.post('/login', login);
router.post('/login/admin', loginAdmin);
router.get('/loggedIn', loggedIn);
router.get('/loggedIn/admin', loggedInAdmin);
router.get('/logout', logout);

module.exports = router;
