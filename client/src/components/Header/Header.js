import { useContext, useState } from 'react';
import { Link} from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import { baseURL } from '../../api';

const Header = () => {
	const {
		loggedIn,
		getLoggedIn,
		loggedInAdmin,
		setLoggedInAdmin,
	} = useContext(AuthContext);

	const logout = async (e) => {
		try {
			e.preventDefault();
			await axios.get(`${baseURL}/auth/logout`);
			await getLoggedIn();
			await setLoggedInAdmin();
			window.location.reload();
		} catch (error) {
			console.log(error.message);
		}
	};

	// Create Mobile Nav
	const [showMenu, setShowMenu] = useState(false);

	return (
		<header className='flex justify-between items-center p-5'>
			<div className='hidden md:flex  md:items-center '>
				<h4 className='text-lg font-extralight mx-5'>
					<Link to='/blogs' className='cursor-pointer'>
						Blog
					</Link>
				</h4>
				{loggedInAdmin === false && (
					<h4 className='text-lg font-extralight mr-5'>
						<Link to='/about' className='cursor-pointer'>
							About
						</Link>
					</h4>
				)}
				{loggedIn === false && loggedInAdmin === false && (
					<>
					<h4 className='text-lg font-extralight mr-5'>
						<Link to='/signup' className='cursor-pointer'>
							Signup
						</Link>
					</h4>
					<h4 className='text-lg font-extralight mr-5'>
						<Link to='/login' className='cursor-pointer'>
							Login
						</Link>
					</h4>
					</>
				)}
				{loggedInAdmin === true && (
					<h4 className='text-lg font-extralight mr-5'>
						<Link
							to='/blogs/create'
							className='cursor-pointer'
						>
							Create
						</Link>
					</h4>
				)}
				{(loggedIn === true || loggedInAdmin === true) && (
					<>
						<h4 className='text-lg font-extralight'>
							<button
								onClick={logout}
								className='cursor-pointer text-lg font-extralight'
							>
								Logout
							</button>
						</h4>
					</>
				)}
			</div>
			<div className='flex-1 text-center text-xl font-extrabold'>
				<h1>
					<Link to='/blogs' className='cursor-pointer'>
						Code Phantom Thief
					</Link>
				</h1>
			</div>
			<div className='hidden md:flex'>
				<a
					href='https://twitter.com/PhantomCode2'
					target='_blank'
					rel='noreferrer'
				>
					<i className='text-lg fab fa-twitter mx-2'></i>
				</a>
				<a
					href='https://www.facebook.com/profile.php?id=100073686807540'
					target='_blank'
					rel='noreferrer'
				>
					<i className='text-lg fab fa-facebook-f mx-2'></i>
				</a>
				<a
					href='https://www.instagram.com/code_phantom_thief/'
					target='_blank'
					rel='noreferrer'
				>
					<i className='text-lg fab fa-instagram mx-2'></i>
				</a>
			</div>
			<div className='block md:hidden'>
				<div className='bg-gray-800 text-gray-100'></div>
				<button
					onClick={() => setShowMenu(!showMenu)}
					className='mobile-menu-button flex items-center px-3 py-2 hover:opacity-80'
				>
					<svg
						className='fill-current h-3 w-3'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<title>Menu</title>
						<path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
					</svg>
				</button>
			</div>
			<div
				className={
					showMenu
						? 'sidebar fixed bg-blue-800 text-blue-100 w-64 min-h-screen px-4 py-7  inset-y-0 left-0 transform translate-x-0 transition duration-200 ease-in-out z-10 md:hidden'
						: 'hidden transition duration-200 ease-in-out '
				}
			>
				<nav>
					<h4 className='text-lg font-extralight'>
						<Link
							to='/blogs'
							className='cursor-pointer block py-2.5 px-4  hover:bg-blue-700 hover:text-white transition duration-200 rounded'
						>
							Blog
						</Link>
					</h4>
					{loggedInAdmin === false && (
						<h4 className='text-lg font-extralight'>
							<Link
								to='/about'
								className='cursor-pointer block py-2.5 px-4  hover:bg-blue-700 hover:text-white transition duration-200 rounded'
							>
								About
							</Link>
						</h4>
					)}
					{loggedIn === false && loggedInAdmin === false && (
						<>
						<h4 className='text-lg font-extralight'>
							<Link
								to='/signup'
								className='cursor-pointer block py-2.5 px-4  hover:bg-blue-700 hover:text-white transition duration-200 rounded'
							>
								Signup
							</Link>
						</h4>
						<h4 className='text-lg font-extralight'>
							<Link
								to='/login'
								className='cursor-pointer block py-2.5 px-4  hover:bg-blue-700 hover:text-white transition duration-200 rounded'
							>
								Login
							</Link>
						</h4>
						</>
					)}
					{loggedInAdmin === true && (
						<h4 className='text-lg font-extralight'>
							<Link
								to='/blogs/create'
								className='cursor-pointer block py-2.5 px-4  hover:bg-blue-700 hover:text-white transition duration-200 rounded'
							>
								Create
							</Link>
						</h4>
					)}
					{(loggedIn === true ||
						loggedInAdmin === true) && (
						<>
							<h4 className='text-lg'>
								<button
									onClick={logout}
									className='font-extralight cursor-pointer block py-2.5 px-4  hover:bg-blue-700 hover:text-white transition duration-200 rounded'
								>
									Logout
								</button>
							</h4>
						</>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Header;
