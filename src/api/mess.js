import axios from 'axios';

export const getMesses = async (userId) => {
	console.log(userId);
	try {
		const response = await axios.get(`/api/v1/users/getMessById/${userId}`, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
