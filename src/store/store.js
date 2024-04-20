import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import messSlice from './features/mess/messSlice';
import messMembersSlice from './features/mess/messMembersSlice';

const store = configureStore({
	reducer: {
		auth: authSlice,
		mess: messSlice,
		messMembers: messMembersSlice,
	},
});

export default store;
