import React, { Component } from "react";
import { Route } from "react-router-dom";
import AuthService from './AuthService';
import Login from './Login';

class PrivateRoute extends Component {
    render() {
        const auth = new AuthService();
        let loginURL = auth.getLoginURL(window.location.href);
        let {component: Component, ...rest} = this.props;
        return <Route {...rest}
            render={props =>
                auth.checkAuth() ? (
                    <Component {...props} />
                ) : (
                    <Login loginURL={loginURL} />
                )
            }
        />
    }
}

export default PrivateRoute;