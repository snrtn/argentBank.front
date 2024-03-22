import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuthenticated: false,
	token: null,
	user: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		signIn: (state, action) => {
			state.isAuthenticated = true;
			state.token = action.payload.token;
			state.user = action.payload.user;
		},
		signOut: (state) => {
			state.isAuthenticated = false;
			state.token = null;
			state.user = null;
		},
		updateUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const { signIn, signOut, updateUser } = authSlice.actions;

export default authSlice.reducer;
