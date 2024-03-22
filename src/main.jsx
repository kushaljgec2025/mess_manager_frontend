import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom';
import Login from './Routes/Login.jsx';
import Mess from './Routes/Mess.jsx';
import Registration from './Routes/Registration.jsx';
import DashBoard from './Routes/DashBoard.jsx';
import User from './Routes/User.jsx';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path='/'
			element={<App />}
		>
			<Route
				path=''
				element={<DashBoard />}
			/>
			<Route
				path='registration'
				element={<Registration />}
			/>
			<Route
				path='login'
				element={<Login />}
			/>
			<Route
				path='user/:id'
				element={<User />}
			/>
			<Route
				path='mess/:id'
				element={<Mess />}
			/>
		</Route>
	)
);
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
