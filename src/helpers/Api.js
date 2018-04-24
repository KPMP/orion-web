import axios from 'axios'

const BASE_URL = 'http://localhost:3030';

export default class Api {
	static getInstance() {
		return axios.create({
		  baseURL: BASE_URL,
		  timeout: 1000,
		})
	}
}