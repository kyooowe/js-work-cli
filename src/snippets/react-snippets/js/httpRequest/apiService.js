//#region Import
import httpRequest from './baseServices';
//#endregion

/**
 * @remarks
 * This service is for auth api call funcitons
 *
 * @param depends on api function
 * @returns specific api function with it own uses
 */
export const apiService = {
	post: async () => {

		// Payload data here
		const payload = {
			name,
			quantity
		};

		return await httpRequest.post(
			'api/endpoint',
			payload
		);
	},
	get: async () => {
		return await httpRequest.post('api/endpoint');
	}
};
