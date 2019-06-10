import decode from 'jwt-decode';

export default class AuthService {

    constructor(authURL) {
        this.authURL = authURL || 'https://auth.kpmp.org';
    }

    getLoginURL(location) {
        return this.authURL + "/api/login?redirect=" + location;
    }

    checkOrGetToken() {

        let config = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: AuthService.getToken()})
        };

        return fetch(this.authURL + '/api/auth', config)
            .then(response => response.json().then(data => ({data, response})))
            .then(({ data, response }) => {
                if (!response.ok) {
                    return Promise.reject(data)
                } else {
                    AuthService.setToken(data.token);
                    console.log(data.token);
                }
            }).catch(err => 
            	console.log("Error: ", err)
            );
    }

    static isTokenValid() {
        return AuthService.getToken() !== null;
    }

    static setToken(token) {
        localStorage.setItem('token', token);
    }

    static getToken() {
    	let token = localStorage.getItem('token');
    	if (token === "null") {
    		token = null;
    	}
        return token;
    }

    static logout() {
        localStorage.removeItem('token');
    }
    
    static getUserInformationFromToken() {
    	let user = undefined;
        let token = AuthService.getToken();
        if (token !== null && token !== undefined) {
            let decoded = decode(token);
            user = JSON.parse(decoded.user);
        }
        return user;
    }

}