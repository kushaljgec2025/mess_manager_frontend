import axios from 'axios';
import FormData from 'form-data';

export const userSignup = async (user) => {
	try {
		const { username, fullName, email, password, confirmPassword, avatar } =
			user;

		if (password !== confirmPassword) {
			console.log('Passwords do not match');
			return {
				status: 'fail',
				message: 'Passwords do not match',
			};
		}

		const form = new FormData();
		form.append('username', username);
		form.append('avatar', avatar[0], avatar[0].name);

		console.log([...form]);

		const response = await axios.post('/api/v1/users/registration1', form, {
			headers: {
				'Content-Type': 'multipart/form-data',
				// ...form.getHeaders(),
				// Authentication: 'Bearer ...',
			},
		});

		console.log('Image uploaded successfully!');
		return response.data;
	} catch (error) {
		// Handle any errors that occur during the signup process
		console.log('Error:', error);
		return {
			status: 'error',
			message: 'An error occurred during signup',
		};
	}
};

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
