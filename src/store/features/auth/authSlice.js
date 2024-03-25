import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	status: false,
	userData: {},
};
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action) => {
			// console.log("action : ", action.payload);
			state.status = true;
			state.userData = action.payload;
			localStorage.setItem('authState', JSON.stringify(state));
		},
		authlogout: (state) => {
			state.status = false;
			state.userData = null;
			localStorage.removeItem('authState');
		},
	},
});

export const { login, authlogout } = authSlice.actions;
export default authSlice.reducer;
