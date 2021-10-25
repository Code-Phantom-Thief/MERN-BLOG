import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../api';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [loggedIn, setLoggedIn] = useState(undefined);
	const [loggedInAdmin, setLoggedInAdmin] = useState(undefined);

	const getLoggedIn = async () => {
		try {
			const loggedInRes = await axios.get(
				`${baseURL}/auth/loggedIn`
			);
			await setLoggedIn(loggedInRes.data);
		} catch (error) {
			console.log(error.message);
		}
	};


	const getLoggedInAdmin = async () => {
		try {
			const loggedInResAdmin = await axios.get(
				`${baseURL}/auth/loggedIn/admin`
			);
			await setLoggedInAdmin(loggedInResAdmin.data);
		} catch (error) {
			console.log(error.message);
		}
	};


	useEffect(() => {
		getLoggedIn();
		getLoggedInAdmin();
	}, []);
	return (
		<AuthContext.Provider
			value={{
				loggedIn,
				getLoggedIn,
				loggedInAdmin,
				setLoggedInAdmin,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
export { AuthContextProvider };
