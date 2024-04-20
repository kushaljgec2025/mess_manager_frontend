import axios from 'axios';

export const getMessesById = async (userId) => {
	try {
		const response = await axios.get(`/api/v1/users/getMessById/${userId}`, {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};

export const getMess = async () => {
	try {
		const response = await axios.get('/api/v1/users/getEnrolledMesses', {
			withCredentials: true,
		});
		return response.data;
	} catch (error) {
		console.log('An error occurred while fetching mess data:', error);
		try {
			const refreshTokenResponse = await axios.get(
				'/api/v1/users/newRefreshToken',
				{
					withCredentials: true,
				}
			);
			console.log('New refresh token:', refreshTokenResponse.data);
			return getMess();
		} catch (refreshTokenError) {
			console.log(
				'An error occurred while fetching new refresh token:',
				refreshTokenError
			);
			throw refreshTokenError;
		}
	}
};

export const getMessMembers = async (messId) => {
	try {
		const response = await axios.get(
			`/api/v1/mess/get-mess-members-info/${messId}`,
			{
				withCredentials: true,
			}
		);
		return response.data.data;
	} catch (error) {
		return error.response.data;
	}
};

export const updateMessLogo = async (messId, data) => {
	try {
		const formData = new FormData();
		formData.append('messLogo', data, data.name);
		const response = await axios.patch(
			`/api/v1/mess/update-mess-logo/${messId}`,
			formData,
			{
				withCredentials: true,
			}
		);
		return response.data;
	} catch (error) {
		return error.response.data;
	}
};
