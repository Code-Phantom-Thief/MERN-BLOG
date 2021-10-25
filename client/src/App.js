import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import BlogList from './components/Blog/BlogList';
import BlogDetail from './components/Blog/BlogDetail';
import BlogNotFound from './components/Blog/BlogNotFound';
import Login from './components/Login/Login';
import Admin from './components/Admin/Admin';
import About from './components/About/About';
import CreateBlog from './components/Blog/CreateBlog';
import axios from 'axios';
import { AuthContextProvider } from './context/AuthContext';
import UpdateBlog from './components/Blog/UpdateBlog';
import Signup from './components/Signup/Signup';

axios.defaults.withCredentials = true;

function App() {
	
	return (
		<AuthContextProvider>
		<div className='bg-[#F1F1EF] w-full min-h-screen'>
			<Header />
			<main className=''>
				<Switch>
					<Route
						exact
						path='/'
						render={() => {
							return <Redirect to='/blogs' />;
						}}
					/>
					<Route exact path='/blogs' component={BlogList} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/signup' component={Signup} />
					<Route exact path='/login/admin' component={Admin} />
					<Route exact path='/about' component={About} />
					<Route
						exact
						path='/blogs/create'
						component={CreateBlog}
					/>
					<Route
						exact
						path='/blogs/:id'
						component={BlogDetail}
					/>
					<Route
						exact
						path='/blogs/update/:id'
						component={UpdateBlog}
					/>
					<Route path='/' component={BlogNotFound} />
				</Switch>
				</main>
			<Footer />
		</div>

		</AuthContextProvider>
	);
}

export default App;
