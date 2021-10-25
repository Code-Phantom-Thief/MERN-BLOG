import axios from 'axios';
import { useEffect, useState } from 'react';
import { baseURL } from '../../api';
import { format } from 'date-fns';
import BlogAdvertising from './BlogAdvertising';
import { Link } from 'react-router-dom';
import {motion} from 'framer-motion'

const BlogList = () => {
	const [blogs, setBlogs] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchAllBlogs = async () => {
			setLoading(true);
			try {
				const { data } = await axios.get(
					`${baseURL}/blogs`
				);
				setBlogs(data);
				setLoading(false);
			} catch (error) {
				console.log(error.message);
				setLoading(false);
			}
		};
		fetchAllBlogs();
	}, []);

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
			<div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 p-5 min-h-screen'>
				{blogs
					.slice(0)
					.reverse()
					.map((blog) => (
						<motion.div
							initial={{ opacity: 0.2, y:-20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{delay:0.3, duration:0.8}}
							className='flex flex-col items-center p-5'
							key={blog._id}
						>
							<Link to={`/blogs/${blog._id}`}>
								<img
									src={blog.image}
									alt={blog.title}
									className='cursor-pointer hover:opacity-80 hover:scale-105 transition delay-75 ease-in'
								/>
							</Link>
							<p className='font-light mt-4'>
								{format(
									new Date(blog.updatedAt),
									'dd/MM/yyyy'
								)}
							</p>
							<h1 className='text-xl font-bold cursor-pointer m-4'>
								{blog.title}
							</h1>
							<p className='text-center truncate w-full font-light mb-4'>
								{blog.description}
							</p>
							<h6 className='cursor-pointer underline font-light hover:opacity-80 transition delay-75 ease-in'>
								<Link to={`/blogs/${blog._id}`}>
									Read More
								</Link>
							</h6>
						</motion.div>
					))}
			</div>
			<BlogAdvertising />
		</>
	);
};

export default BlogList;
