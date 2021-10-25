import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { baseURL } from '../../api';
import axios from 'axios';

const CreateBlog = () => {
	const [blog, setBlog] = useState({
		title: '',
		image:
			'https://images.unsplash.com/photo-1612698093158-e07ac200d44e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
		description: '',
	});

	const history = useHistory();

	const [error, setError] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		setError('');
		const createBlog = async () => {
			try {
				await axios.post(
					`${baseURL}/blogs`,
					blog,
					{
						credentials: 'include',
					}
				);
				history.push('/');
			} catch (error) {
				if (error.response && error.response.data) {
					return setError(error.response.data.message);
				}
			}
		};
		createBlog();
	};
	return (
		<div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
			<div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
				{error && (
					<h1 className='text-red-600 text-center text-2xl mt-10'>
						{error}
					</h1>
				)}
				<div className='p-6 bg-white border-b border-gray-200'>
					<form onSubmit={handleSubmit} method='POST'>
						<div className='mb-4'>
							<label className='text-xl text-gray-600'>
								Title{' '}
								<span className='text-red-500'>*</span>
							</label>
							<input
								placeholder="Title"
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
								type='text'
								className='border-2 border-gray-300 p-2 w-full'
								name='image'
								id='image'
								placeholder='You can use URL image only...'
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
								placeholder="Description"
								className='border-2 border-gray-300 p-3'
								rows='30'
								name='description'
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
	);
};

export default CreateBlog;
