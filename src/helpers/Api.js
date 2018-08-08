import axios from 'axios'

let BASE_URL = 'http://localhost:3030';
if (process.env.REACT_APP_ENVIRONMENT === 'production') {
	BASE_URL = 'http://upload.kpmp.org:3030';
} else if (process.env.REACT_APP_ENVIRONMENT === 'dev') {
	BASE_URL = 'http://141.214.4.23:3030';
}

export default class Api {
	static getInstance() {
		return axios.create({
		  baseURL: BASE_URL,
		  timeout: 10000,
		})
	}
}
