import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	status: false,
	messData: [],
};

const messSlice = createSlice({
	name: 'mess',
	initialState,
	reducers: {
		addMess: (state, action) => {
			state.status = true;
			state.messData = action.payload;
		},
		removeMess: (state) => {
			state.status = false;
			state.messData = null;
		},
	},
});

export const { addMess, removeMess } = messSlice.actions;
export default messSlice.reducer;
