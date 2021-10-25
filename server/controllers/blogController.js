const Blog = require('../models/Blog');
const {
	blogSchema,
} = require('../middleware/joi_validation');

exports.getAllBlogs = async (req, res) => {
	try {
		const allBlogs = await Blog.find();
		res.status(200).json(allBlogs);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.createBlog = async (req, res) => {
	try {
		const validation_results =
			await blogSchema.validateAsync(req.body);
		const newBlog = new Blog(validation_results);
		await newBlog.save();
		res
			.status(201)
			.json({ message: 'Blog created successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

exports.getABlog = async (req, res) => {
	const id = req.params.id;
	try {
		const blog = await Blog.findById(id);
		if (!blog) {
			return res
				.status(404)
				.json({ message: 'Blog not found.' });
		}
		res.status(200).json(blog);
	} catch (error) {
		return res
			.status(404)
			.json({ message: 'Blog not found.' });
	}
};

exports.updateBlog = async (req, res) => {
	const id = req.params.id;
	try {
		const blog = await Blog.findByIdAndUpdate(
			id,
			req.body,
			{ new: true }
		);
		res.status(200).json(blog);
	} catch (error) {
		return res
			.status(404)
			.json({ message: 'Blog not found.' });
	}
};

exports.commentBlog = async (req, res) => {
	const id = req.params.id;

	const { creator, comment, avatar } = req.body;

	try {
		if (!creator) {
			return res.status(400).json({
				message: 'Creator cannot be an empty field',
			});
		}
		if (creator.length > 50) {
			return res.status(400).json({
				message:
					'Creator should have a maximum length of 50',
			});
		}
		if (!comment) {
			return res.status(400).json({
				message: 'Comment cannot be an empty field',
			});
		}
		if (comment.length > 1000) {
			return res.status(400).json({
				message:
					'Comment should have a maximum length of 1000',
			});
		}

		const validURL = /^(ftp|http|https):\/\/[^ "]+$/.test(
			avatar
		);

		if (validURL === false) {
			return res.status(400).json({
				message: 'Please enter valid URL for avatar',
			});
		}

		const existBlog = await Blog.findById(id);

		if (!existBlog) {
			return res
				.status(404)
				.json({ message: 'Blog not found.' });
		}

		existBlog.comments.push({
			id: id,
			creator: creator,
			comment: comment,
			avatar: avatar,
			createdAt: new Date()
		});

		const updatedBlog = await Blog.findByIdAndUpdate(
			id,
			existBlog,
			{ new: true }
		);

		res.status(200).json(updatedBlog);
	} catch (error) {
		return res
			.status(404)
			.json({ message: 'Blog not found.' });
	}
};

exports.deleteBlog = async (req, res) => {
	const id = req.params.id;
	try {
		await Blog.findByIdAndDelete(id);
		res
			.status(200)
			.json({ message: 'Blog has been deleted.' });
	} catch (error) {
		return res
			.status(404)
			.json({ message: 'Blog not found.' });
	}
};
