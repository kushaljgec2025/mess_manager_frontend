import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	status: false,
	messMembers: [],
};

const messMembersSlice = createSlice({
	name: 'messMembers',
	initialState,
	reducers: {
		addMessMembers: (state, action) => {
			state.status = true;
			state.messMembers.push(action.payload);
		},
		removeMessMembers: (state) => {
			state.status = false;
			state.messMembers = [];
		},
	},
});

export const { addMessMembers, removeMessMembers } = messMembersSlice.actions;

export default messMembersSlice.reducer;
