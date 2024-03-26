import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { getUser } from './api/auth';
import { useDispatch } from 'react-redux';

export default function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		getUser()
			.then((user) => {
				console.log('User:', user);
			})
			.catch((error) => {
				console.error('An error occurred while fetching user data:', error);
			});
	}, []);
	return (
		<>
			<Toaster />
			<Outlet />
		</>
	);
}
