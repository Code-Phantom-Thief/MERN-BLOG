import { useState, useEffect, useContext } from 'react';
import {
	useParams,
	useHistory,
	Link,
} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { baseURL } from '../../api';
import AuthContext from '../../context/AuthContext';
import { motion } from 'framer-motion';

const options = {
	weekday: 'short',
	year: 'numeric',
	month: 'short',
	day: '2-digit',
};

const BlogDetail = () => {
	const history = useHistory();
	const { id } = useParams();

	const [commentError, setCommentError] = useState('');

	const [blog, setBlog] = useState([]);
	const [comments, setComments] = useState({
		creator: '',
		comment: '',
		avatar: '',
	});

	const [loading, setLoading] = useState(false);

	const { loggedIn, loggedInAdmin } =
		useContext(AuthContext);

	const handleDelete = async (e) => {
		e.preventDefault();
		try {
			await axios.delete(`${baseURL}/blogs/${id}`);
			history.push('/');
		} catch (error) {
			console.log(error.message);
		}
	};

	const submitComment = async (e) => {
		e.preventDefault();
		setCommentError('');
		try {
			await axios.put(
				`${baseURL}/blogs/comment/${id}`,
				comments,
				{
					credentials: 'include',
				}
			);
			window.location.reload();
		} catch (error) {
			if (error.response && error.response.data) {
				return setCommentError(error.response.data.message);
			}
		}
	};

	useEffect(() => {
		const fetchBlog = async () => {
			setLoading(true);
			try {
				const { data } = await axios.get(
					`${baseURL}/blogs/${id}`
				);
				setBlog(data);
				setLoading(false);
			} catch (error) {
				console.log(error.message);
				setLoading(false);
			}
		};
		fetchBlog();
	}, [id]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			{loading && (
				<div className='w-full flex flex-col text-center items-center justify-center '>
					<h1 className='font-extrabold pb-2'>
						Loading...
					</h1>
					<div className='w-40 h-40 border-t-4 border-b-4 border-green-900 rounded-full animate-spin'></div>
				</div>
			)}
			<div className=' w-full min-h-screen'>
				{
					<div
						className='flex flex-col items-center p-5'
						key={blog._id}
					>
						{loggedInAdmin === true && (
							<div className='flex w-full justify-end'>
								<button className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-5'>
									<Link to={`/blogs/update/${id}`}>
										Update
									</Link>
								</button>
								<button
									onClick={handleDelete}
									className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
								>
									Delete
								</button>
							</div>
						)}
						{loggedInAdmin === false && (
							<div className='flex w-full justify-end'>
								<button className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-5'>
									<Link to='/'>Back</Link>
								</button>
							</div>
						)}
						<p className=' text-sm md:text-lg font-mono mt-4 items-center'>
							{new Date(blog.updatedAt).toLocaleDateString(
								'en-US',
								options
							)}{' '}
							- Written By Code Phantom Thief
						</p>
						<h1 className='text-3xl md:text-7xl font-mono font-extrabold cursor-pointer m-10'>
							{blog.title}
						</h1>
						<motion.img
							initial={{ opacity: 0.2, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3, duration: 0.8 }}
							src={blog.image}
							alt={blog.title}
						/>

						<p className='font-normal p-5  md:p-10 mb-4 leading-loose'>
							{blog.description}
						</p>
						<p>- Written By Code Phantom Thief</p>
					</div>
				}
			</div>
			<div className='flex items-center justify-center mt-5 max-w-lg md:max-w-full md:mx-auto m-10'>
				<form
					method='PUT'
					onSubmit={submitComment}
					className='w-full max-w-xl md:max-w-full bg-white rounded-lg md:m-20'
				>
					<div className='flex flex-wrap -mx-3 mb-6 p-10'>
						<h2 className='px-4 pt-3 pb-2 text-gray-800 text-lg'>
							Add a new comment
						</h2>
						<div className='w-full px-3 mb-2 mt-2'>
							{commentError && (
								<h2 className='text-red-600 mb-3'>
									{commentError}
								</h2>
							)}
							<input
								type='text'
								placeholder='Type Your Username'
								className={`${
									loggedIn === true ||
									loggedInAdmin === true
										? 'cursor-pointer'
										: 'cursor-not-allowed disabled:'
								} w-full p-3 bg-gray-100  rounded border border-gray-400 focus:outline-none`}
								name='creator'
								readOnly={
									loggedIn === true ||
									loggedInAdmin === true
										? false
										: true
								}
								value={comments.creator}
								onChange={(e) =>
									setComments({
										...comments,
										creator: e.target.value,
									})
								}
								required
							/>
						</div>
						<div className='w-full px-3 mb-2 mt-2'>
							<input
								type='text'
								placeholder='Type Your Avatar URL'
								className={`${
									loggedIn === true ||
									loggedInAdmin === true
										? 'cursor-pointer'
										: 'cursor-not-allowed disabled:'
								} w-full p-3 bg-gray-100  rounded border border-gray-400 focus:outline-none`}
								name='avatar'
								readOnly={
									loggedIn === true ||
									loggedInAdmin === true
										? false
										: true
								}
								value={comments.avatar}
								onChange={(e) =>
									setComments({
										...comments,
										avatar: e.target.value,
									})
								}
								required
							/>
						</div>
						<div className='w-full px-3 mb-2 mt-2'>
							<textarea
								className={`${
									loggedIn === true ||
									loggedInAdmin === true
										? 'cursor-pointer'
										: 'cursor-not-allowed disabled:'
								} bg-gray-100  rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 focus:outline-none`}
								placeholder='Type Your Comment'
								required
								name='creator'
								readOnly={
									loggedIn === true ||
									loggedInAdmin === true
										? false
										: true
								}
								value={comments.comment}
								onChange={(e) =>
									setComments({
										...comments,
										comment: e.target.value,
									})
								}
							></textarea>
						</div>
						<div className='w-full flex items-start md:w-full px-3'>
							<div className='flex items-start w-1/2 text-gray-700 px-2 mr-auto'></div>
							<div className='-mr-1'>
								<input
									type='submit'
									className={`${
										loggedIn === true ||
										loggedInAdmin === true
											? 'cursor-pointer hover:opacity-80'
											: 'cursor-not-allowed'
									} text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 bg-gray-100`}
									value='Post Comment'
									disabled={
										loggedIn === true ||
										loggedInAdmin === true
											? false
											: true
									}
								/>
							</div>
						</div>
					</div>
				</form>
			</div>
			{blog.comments?.length > 0 && (
				<h1 className=' pl-10 md:pl-24 mb-2'>Comments</h1>
			)}
			{blog.comments?.map((blog) => (
				<div
					className='flex  w-10/12 mx-auto mb-4'
					key={uuidv4()}
				>
					<div className='flex-shrink-0 mr-3'>
						<img
							className='mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10 object-cover'
							src={blog.avatar}
							alt={`Avatar`}
						/>
					</div>
					<div className='flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed'>
						<p className='text-xs text-gray-400'>
							{' '}
							{new Date(blog.createdAt).toLocaleDateString(
								'en-US',
								options
							)}
						</p>
						<strong>{blog.creator}</strong>
						<p className='text-sm'>{blog.comment}</p>
					</div>
				</div>
			))}
		</>
	);
};

export default BlogDetail;
