import axios from "axios";
import { getCookie } from "./cookies.utils";

axios.interceptors.request.use(config => {
	if (config.url.includes('/api/requestAuth')) {
		return config;
	} else {
		const xsrfToken = getCookie('authT');
		config.headers = { 'authorization' : xsrfToken }

		return config;
	}
})

export const axiosRequest = (method, url, params = {}) => {
	return axios({
		method,
		url,
		params
	})
		.then(response => {
			if (response.status === 200) {
				return [null, response.data]
			} else {
				throw new Error(response)
			}
		})
		.catch(error => {
			return [error]
		})
};
