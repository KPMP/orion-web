import axios from 'axios'

const BASE_URL = (process.env.REACT_APP_ENVIRONMENT === 'production' ? 'http://upload.kpmp.org' : 'http://localhost') + ':3030';

export default class Api {
	static getInstance() {
		return axios.create({
		  baseURL: BASE_URL,
		  timeout: 10000,
		})
	}
}