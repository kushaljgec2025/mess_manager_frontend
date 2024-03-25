import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { getUser } from './api/auth';

export default function App() {
	useEffect(() => {
		const getUserDetails = async () => {
			const user = await getUser();
			console.log(user);
		};
		getUserDetails();
	}, []);
	return (
		<>
			<Toaster />
			<Outlet />
		</>
	);
}
