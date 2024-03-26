import axios from 'axios';

export const userLogin = async (email, password) => {
	try {
		const response = await axios.post(
			'/api/v1/users/login',
			{
				email,
				password,
			},
			{
				withCredentials: true,
			}
		);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const getUser = async () => {
	try {
		const response = await axios.get('/api/v1/users/getCurrentUser', {
			withCredentials: true,
		});
		return response.data.data;
	} catch (error) {
		console.log('An error occurred while fetching user data:', error);
		try {
			const refreshTokenResponse = await axios.get(
				'/api/v1/users/newRefreshToken',
				{
					withCredentials: true,
				}
			);
			console.log('New refresh token:', refreshTokenResponse.data);
			return getUser();
		} catch (refreshTokenError) {
			console.log(
				'An error occurred while fetching new refresh token:',
				refreshTokenError
			);
			throw refreshTokenError;
		}
	}
};

export const getUserById = async (userId) => {
	try {
		const response = await axios.get(`/api/v1/users/getUserById/${userId}`, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
