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

export const getTransactionsByUserIdInMess = async (messID, userID) => {
	try {
		const response = await axios.get(
			`/api/v1/incomingAmount/get-transactions-by-member/${messID}/${userID}`,
			{
				withCredentials: true,
			}
		);
		return response.data.data;
	} catch (error) {
		return error.response.data;
	}
};

export const addTransaction = async (messId, memberId, amount, description) => {
	try {
		const response = await axios.patch(
			`/api/v1/incomingAmount/add-amount/${messId}`,
			{
				memberId,
				amount,
				description,
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

export const getTransactionsByMessId = async (messId) => {
	try {
		const response = await axios.get(
			`/api/v1/incomingAmount/get-incoming-transactions/${messId}`,
			{
				withCredentials: true,
			}
		);
		return response.data.data;
	} catch (error) {
		return error.response.data;
	}
};
