//#region Import
import httpRequest from './baseServices';
//#endregion

//#region Interface
interface IProducts {
	name: string;
	quantity: number;
}
//#endregion

/**
 * @remarks
 * This service is for auth api call funcitons
 *
 * @param depends on api function
 * @returns specific api function with it own uses
 */
export const apiService = {
	post: async ({ name, quantity }: IProducts) => {

		// Payload data here
		const payload = {
			name,
			quantity
		};

		return await httpRequest.post<void, IProducts>(
			'api/endpoint',
			payload
		);
	},
	get: async () => {
		return await httpRequest.post<void, IProducts>('api/endpoint');
	}
};
