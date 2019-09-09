import React, { Component } from 'react';
import { Navbar, NavbarBrand, Col } from 'reactstrap';
import NavUser from "./NavUser";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


const NO_USERNAME = "Not Logged In";

class NavBar extends Component {

    constructor(props) {
        super(props);

        if(!this.isRemoteDataLoaded()) {
        	console.log("trying to get data");
        	this.props.loadRemoteData();
        }
    }

    getDisplayName() {

        let userInformation = this.props.userInformation || {
            displayName: NO_USERNAME
        };

        let isDisplayNameEmpty = !userInformation.displayName || userInformation.displayName.length === 0;

        let name = isDisplayNameEmpty ?
            userInformation.firstName + " " + userInformation.lastName :
            userInformation.displayName;

        if(isDisplayNameEmpty || name === " ") {
            name = NO_USERNAME;
        }

        return name;
    }
    
    isRemoteDataLoaded() {
    	return this.props.userInformation !== false;
    }

    render() {

        let displayName = this.getDisplayName();
        let isUserInformationLoaded = this.isRemoteDataLoaded();

        return (
            <Navbar id="navbar" className="px-1 py-1 fixed-top">
                <Col sm={6}>
                    <Link to="/" className="navbar-header">
                        <NavbarBrand className="d-flex align-items-center">
                            <img src="img/logo.png" alt="Kidney Precision Medicine Project Data Lake Uploader" className="logo" />
                            <span className="ml-2 text-dark">Data Lake Uploader</span>
                        </NavbarBrand>
                    </Link>
                </Col>
                <Col sm={6} className="d-none d-md-block">
                    <NavUser displayName={isUserInformationLoaded ? displayName : "..."}/>
                </Col>
            </Navbar>
        );
    }
}

NavBar.propTypes = {
    userInformation: PropTypes.any,
    loadRemoteData: PropTypes.func
}

export default NavBar;
