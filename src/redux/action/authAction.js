import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, updateUserProfileApi } from '../../service/apiServices';
import { signIn, updateUser } from '../slice/authSlice.js';

export const login = createAsyncThunk('auth/login', async (userData, { dispatch, rejectWithValue }) => {
	try {
		const response = await loginApi(userData.email, userData.password);
		dispatch(signIn({ token: response.data.token, user: response.data.user }));
		return response.data.user;
	} catch (error) {
		return rejectWithValue(error.message);
	}
});

export const updateUserProfile = createAsyncThunk(
	'auth/updateUserProfile',
	async (updatedProfile, { getState, dispatch, rejectWithValue }) => {
		try {
			const token = getState().auth.token || localStorage.getItem('authToken');
			const response = await updateUserProfileApi(updatedProfile, token);
			dispatch(updateUser(response.data.body));
			return response.data.body;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	},
);
