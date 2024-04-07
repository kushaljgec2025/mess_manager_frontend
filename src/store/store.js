import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import messSlice from './features/mess/messSlice';

const store = configureStore({
	reducer: {
		auth: authSlice,
		mess: messSlice,
	},
});

export default store;
