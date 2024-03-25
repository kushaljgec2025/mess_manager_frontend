import axios from 'axios';

const backendEndpoint_userRoute =
	import.meta.env.VITE_BACKEND_API_ENDPOINT + '/users';

export const userLogin = async (email, password) => {
	try {
		const response = await axios.post(`${backendEndpoint_userRoute}/login`, {
			email,
			password,
		});
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const getUser = async () => {
	try {
		const user = await axios.get(`${backendEndpoint_userRoute}/getCurrentUser`);
		console.log(user.data);
		return user.data;
	} catch (error) {
		console.log(error.response.data);
		return error.response.data;
	}
};
