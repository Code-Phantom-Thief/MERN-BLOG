const router = require('express').Router();
const {
	getAllBlogs,
    createBlog,
    getABlog,
    updateBlog,
    commentBlog,
    deleteBlog
} = require('../controllers/blogController');
const {requireAuth, requireComment }= require('../middleware/authMiddleware');

router.get('/', getAllBlogs);
router.post('/',
    requireAuth,
    createBlog);

router.get('/:id', getABlog);
router.put('/:id', requireAuth, updateBlog);
router.put('/comment/:id', requireComment, commentBlog);
router.delete('/:id', requireAuth, deleteBlog);

module.exports = router;
