import axios from 'axios';

export const getTransactions = async (limit = 5) => {
	try {
		const response = await axios.get(
			`/api/v1/users/getPaymentList?limit=${limit}`,
			{
				withCredentials: true,
			}
		);
		return response.data.data;
	} catch (error) {
		return error.response.data;
	}
};
