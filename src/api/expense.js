import axios from 'axios';

export const getExpensesByMessId = async (messId, currentPage) => {
	try {
		const limit = Math.max(10, currentPage * 2 + 2);
		const response = await axios.get(
			`/api/v1/expanses/get-expanses/${messId}/?limit=${limit}`,
			{
				withCredentials: true,
			}
		);
		return response.data.data;
	} catch (error) {
		return error.response.data;
	}
};

export const addExpense = async (messId, expenseFor, amount, description) => {
	try {
		const response = await axios.patch(
			`/api/v1/expanses/add-expanse/${messId}`,
			{
				expanseFor: expenseFor,
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
