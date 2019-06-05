export default class AuthService {

    constructor(authURL) {
        this.authURL = authURL || 'https://auth.kpmp.org';
    }

    checkAuth() {
        this.checkOrGetToken();
        if (AuthService.getToken() !== null) {
            return AuthService.isTokenValid();
        } else {
            return false;
        }
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

        fetch(this.authURL + '/api/auth', config)
            .then(response => response.json().then(data => ({data, response})))
            .then(({ data, response }) => {
                if (!response.ok) {
                    return Promise.reject(data)
                } else {
                    AuthService.setToken(data.token);
                }
            }).catch(err => console.log("Error: ", err));
    }

    static isTokenValid(token) {
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

}