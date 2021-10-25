require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const corsOptions = {
	origin: [
		'http://localhost:3000',
		'https://mern-blog-codephantomthief.netlify.app',
		'https://mern-blog-codephantomthief.netlify.app/blogs',
	],
	credentials: true,
};

app.use(express.json({limit: '30mb'}));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(helmet());

const PORT = process.env.PORT || 5000;
const MongoDB = require('./db/db');
MongoDB();

const authRouter = require('./routes/authRoutes');
const blogRouter = require('./routes/blogRoutes');

app.use('/api/auth', authRouter);
app.use('/api/blogs', blogRouter);

app.use(
	express.static(
		path.join(
			__dirname,
			'/client/build'
		)
	)
);

app.get('*', (req, res) => {
	res.sendFile(
		path.join(
			__dirname,
			'/client/build',
			'index.html'
		)
	);
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
