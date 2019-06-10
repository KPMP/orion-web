import React, { Component } from 'react';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authPending: 1
        }
    }

    componentWillMount() {
    	console.log("in login")
        window.location.href = this.props.loginURL;
    }

    render() {
        return <div>You are not logged in. Redirecting.</div>
    }

}

export default Login;