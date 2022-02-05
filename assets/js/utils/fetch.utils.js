import axios from "axios";
import { appBusy, appIdle } from './functions.utils';

export const axiosRequest = (method, url, data, busy) => {
	appBusy(busy);

	return axios({
		method,
		url,
		data
	})
		.then(response => {
			if (response.status === 200) {
				return [null, response.data]
			} else {
				throw new Error(response)
			}
	})
		.catch(error => {
		// Error

			console.log(error)
		// store.dispatch('popError', {
		// 	body : {
		// 		code   : error.code || error.status,
		// 		msg    : error.message,
		// 		path   : url,
		// 		method : method
		// 	},
		// 	title : 'Fetch Error'
		// });
		return [error]
	})
		.finally(() => {
			appIdle(busy)
		})
};
