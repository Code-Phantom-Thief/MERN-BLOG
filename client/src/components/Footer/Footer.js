import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import {baseURL} from '../../api'

const Footer = () => {
	const { loggedIn, getLoggedIn } = useContext(AuthContext);
	const history = useHistory();
	const logout = async (e) => {
		e.preventDefault();
		await axios.get(`${baseURL}/auth/logout`);
		await getLoggedIn();
		history.push('/');
	};
	return (
		<div className='flex flex-col min-h-[20vh] justify-around items-center'>
			<div className=' text-xl font-extrabold'>
				<h1>Code Phantom Thief</h1>
			</div>
			<div className='flex items-center'>
				<h4 className='text-lg font-light mx-5 '>
					<Link
						to='/blogs'
						className='cursor-pointer border-gray-500 border-b-[1px]'
					>
						Blog
					</Link>
				</h4>
				{loggedIn === false && (
					<>
						<h4 className='text-lg font-light mr-5 '>
							<Link
								to='/about'
								className='cursor-pointer border-gray-500 border-b-[1px]'
							>
								About
							</Link>
						</h4>
						<h4 className='text-lg font-light'>
							<Link
								to='/login'
								className='cursor-pointer border-gray-500 border-b-[1px]'
							>
								Login
							</Link>
						</h4>
					</>
				)}
				{loggedIn === true && (
					<h4 className='text-lg font-light '>
						<span
							onClick={logout}
							className='cursor-pointer border-gray-500 border-b-[1px]'
						>
							Logout
						</span>
					</h4>
				)}
			</div>
			<div>
				<p className='text-lg font-extralight'>
					Created By{' '}
					<span className='underline'>
						<a
							href='https://github.com/Code-Phantom-Thief'
							target='_blank'
							rel='noreferrer'
						>
							Code Phantom Thief
						</a>
					</span>
				</p>
			</div>
		</div>
	);
};

export default Footer;
