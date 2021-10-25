import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../api';

const UpdateBlog = () => {
	const history = useHistory();
	const { id } = useParams();

	const [loading, setLoading] = useState(false);
	const [blog, setBlog] = useState({
		title: '',
		image:
			'https://images.unsplash.com/photo-1612698093158-e07ac200d44e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
		description: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch(`${baseURL}/blogs/${id}`, {
				method: 'PUT',
				body: JSON.stringify(blog),
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});
			await res.json();
			history.push('/');
		} catch (error) {
			console.log(error.message);
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
			<div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
				<div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
					<div className='p-6 bg-white border-b border-gray-200'>
						<form onSubmit={handleSubmit} method='PUT'>
							<div className='mb-4'>
								<label className='text-xl text-gray-600'>
									Title{' '}
									<span className='text-red-500'>*</span>
								</label>
								<input
									type='text'
									className='border-2 border-gray-300 p-2 w-full'
									name='title'
									id='title'
									required
									value={blog.title}
									onChange={(e) =>
										setBlog({
											...blog,
											title: e.target.value,
										})
									}
								/>
							</div>

							<div className='mb-4'>
								<label className='text-xl text-gray-600'>
									Image
								</label>
								<input
									type='test'
									required
									className='border-2 border-gray-300 p-2 w-full'
									name='image'
									id='image'
									placeholder='image'
									value={blog.image}
									onChange={(e) =>
										setBlog({
											...blog,
											image: e.target.value,
										})
									}
								/>
							</div>

							<div className='mb-8 flex flex-col'>
								<label className='text-xl text-gray-600'>
									Description{' '}
									<span className='text-red-500'>*</span>
								</label>
								<textarea
									className='border-2 border-gray-300 p-3'
									rows='30'
									name='description'
									required
									value={blog.description}
									onChange={(e) =>
										setBlog({
											...blog,
											description: e.target.value,
										})
									}
								></textarea>
							</div>

							<div className='flex p-1'>
								<button
									type='submit'
									className='p-3 bg-blue-500 text-white hover:bg-blue-400'
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default UpdateBlog;
