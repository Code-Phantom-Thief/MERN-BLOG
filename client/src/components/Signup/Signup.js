import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { baseURL } from '../../api';
import axios from 'axios';
import signup from './signup.png';

const Signup = () => {
	const history = useHistory();

	const [UserData, setUserData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	
	const [success, setSuccess] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSuccess('');
		setError('');
		try {
			const { data } = await axios.post(
				`${baseURL}/auth/signup`,
				UserData,
				{
					credentials: 'include',
				}
			);
			setSuccess(data.message);

			setTimeout(() => {
				history.push('/');
				window.location.reload();
			}, 2000);
		} catch (error) {
			if (error.response && error.response.data) {
				return setError(error.response.data.message);
			}
		}
	};
	return (
		<div className='min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5'>
			<div className='bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden'>
				<div className='md:flex w-full'>
					<div className='hidden md:block w-1/2 bg-indigo-500'>
						<img
							src={signup}
							alt='signupimage'
							className='object-contain h-full'
						/>
					</div>
					<div className='w-full md:w-1/2 py-10 px-5 md:px-10'>
						<div className='text-center mb-10'>
							<h1 className='font-bold text-3xl text-gray-900'>
								SIGNUP
							</h1>
							<p>Enter your information to signup</p>
						</div>
						{error && (
							<h1 className='text-red-600 text-center'>
								{error}
							</h1>
						)}
						{success && (
							<h1 className='text-green-600 text-center'>
								{success} Now Loading...
							</h1>
						)}
						<form onSubmit={handleSubmit}>
							<div className='flex -mx-3'>
								<div className='w-full px-3 mb-5'>
									<label
										htmlFor='username'
										className='text-xs font-semibold px-1'
									>
										Username
									</label>
									<div className='flex'>
										<div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'>
											<i className='mdi mdi-email-outline text-gray-400 text-lg'></i>
										</div>
										<input
											type='text'
											className='w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
											placeholder='Username'
											name='text'
											value={UserData.username}
											onChange={(e) =>
												setUserData({
													...UserData,
													username: e.target.value,
												})
											}
										/>
									</div>
								</div>
							</div>
							<div className='flex -mx-3'>
								<div className='w-full px-3 mb-5'>
									<label
										htmlFor='email'
										className='text-xs font-semibold px-1'
									>
										Email
									</label>
									<div className='flex'>
										<div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'>
											<i className='mdi mdi-email-outline text-gray-400 text-lg'></i>
										</div>
										<input
											type='email'
											className='w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
											placeholder='johnsmith@example.com'
											name='email'
											value={UserData.email}
											onChange={(e) =>
												setUserData({
													...UserData,
													email: e.target.value,
												})
											}
										/>
									</div>
								</div>
							</div>
							<div className='flex -mx-3'>
								<div className='w-full px-3 mb-12'>
									<label
										htmlFor='password'
										className='text-xs font-semibold px-1'
									>
										Password
									</label>
									<div className='flex'>
										<div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'>
											<i className='mdi mdi-lock-outline text-gray-400 text-lg'></i>
										</div>
										<input
											type='password'
											className='w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
											placeholder='************'
											autoComplete='password'
											name='password'
											value={UserData.password}
											onChange={(e) =>
												setUserData({
													...UserData,
													password: e.target.value,
												})
											}
										/>
									</div>
								</div>
							</div>
							<div className='flex -mx-3'>
								<div className='w-full px-3 mb-12'>
									<label
										htmlFor='password'
										className='text-xs font-semibold px-1'
									>
										Confirm Password
									</label>
									<div className='flex'>
										<div className='w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center'>
											<i className='mdi mdi-lock-outline text-gray-400 text-lg'></i>
										</div>
										<input
											type='password'
											className='w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500'
											placeholder='************'
											autoComplete='confirm password'
											name='confirm password'
											value={UserData.confirmPassword}
											onChange={(e) =>
												setUserData({
													...UserData,
													confirmPassword: e.target.value,
												})
											}
										/>
									</div>
								</div>
							</div>
							<div className='flex -mx-3'>
								<div className='w-full px-3 mb-5'>
									<button className='block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold'>
										SIGNUP NOW
									</button>
								</div>
							</div>
						</form>
						<p className='text-center font-light '>
							Do you have an account already?
							<span className=' border-b-[1px] border-indigo-500 text-indigo-500 hover:opacity-80'>
								<Link to='/login'>&nbsp;Login</Link>
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
