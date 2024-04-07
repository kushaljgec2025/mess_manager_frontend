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
import Login from './Pages/Login.jsx';
import Mess from './Pages/Mess.jsx';
import Registration from './Pages/Registration.jsx';
import DashBoard from './Pages/DashBoard.jsx';
import User from './Pages/User.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import UserById from './Pages/UserById.jsx';
import CreateNewMess from './Pages/CreateNewMess.jsx';

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
				path='user'
				element={<User />}
			/>
			<Route
				path='user/:id'
				element={<UserById />}
			/>
			<Route
				path='mess/:id'
				element={<Mess />}
			/>
			<Route
				path='create-new-mess'
				element={<CreateNewMess />}
			/>
		</Route>
	)
);
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
