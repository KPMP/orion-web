import axios from 'axios'

export default class Api {
	static getInstance() {
		return axios.create({
		  timeout: 10000,
		})
	}
}
