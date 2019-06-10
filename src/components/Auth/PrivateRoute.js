import React, { Component } from "react";
import { Route } from "react-router-dom";
import AuthService from './AuthService';
import Login from './Login';

class PrivateRoute extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authState: undefined
        };

        this.auth = new AuthService();
    }

    componentDidMount() {
        this.auth.checkOrGetToken().then((response) => {
            if (AuthService.getToken() !== null) {
                this.setState({authState: AuthService.isTokenValid()});
            } else {
                this.setState({authState: false});
            }
        });
    }

    render() {
        let loginURL = this.auth.getLoginURL(window.location.href);
        let {component: Component, ...rest} = this.props;
        if (this.state.authState === undefined || this.state.authState === null){
            return <div>Checking authorization . . . </div>
        } else {
            return <Route {...rest}
                          render={props =>
                              this.state.authState ? (
                                  <Component {...props} />
                              ) : (
                                  <Login loginURL={loginURL}/>
                              )
                          }
            />
        }
    }
}

export default PrivateRoute;