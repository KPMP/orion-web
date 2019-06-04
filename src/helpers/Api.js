import axios from 'axios'
import AuthService from '../components/Auth/AuthService'
import packageJson from '../../package.json';

export default class Api {

	constructor() {
		this.axios = axios.create({
			timeout: 10000,
			headers: {'Authorization': 'Bearer ' + AuthService.getToken()}
		});
	}

	static getInstance() {

		if(!Api.instance) {
			Api.instance = new Api();
		}

		return Api.instance;
	}

	get() {
		return this.axios.get.apply(this.axios, this.fixArguments(arguments));
	}

	post() {
		return this.axios.post.apply(this.axios, this.fixArguments(arguments));
	}

	fixArguments(args) {
		let output = [];

		for(let i = 0; i < args.length; i++) {
			if(i === 0) {
				output.push(this.isDevelopment() ? args[i].replace(/^\/?api/, "") : args[i]);
			}

			else output.push(args[i]);
		}

		return output;
	}
	
	getBaseURL() {
		if (this.isDevelopment()) {
			return packageJson.proxy;
		}
		return '';
	}
	
	isDevelopment() {
		return process.env.NODE_ENV === "development";
	}
}
