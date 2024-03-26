import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { getUser } from './api/auth';
import { useDispatch } from 'react-redux';
import { login } from './store/features/auth/authSlice';
import { Footer, Navbar } from './components';

export default function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		getUser()
			.then((userData) => {
				if (userData) {
					dispatch(login(userData));
				} else {
					dispatch(login());
				}
			})
			.finally(() => {});
	}, []);
	return (
		<>
			<Toaster />
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
}
