import React, { Component } from 'react';
import { Navbar, NavbarBrand, Col } from 'reactstrap';
import NavUser from "./NavUser";
import { Link } from 'react-router-dom';

class NavBar extends Component {
    render() {

        let isDisplayNameEmpty = this.props.displayName === undefined
            || this.props.displayName === "";

        let name = isDisplayNameEmpty ?
            this.props.firstName + " " + this.props.lastName :
            this.props.displayName;

        if(isDisplayNameEmpty || name === " ") {
            name = "NO USERNAME";
        }

        return (
            <Navbar id="navbar" className="px-1 py-1 fixed-top">
                <Col sm={6}>
                    <Link to="/" className="navbar-header text-dark">
                        <NavbarBrand className="d-flex align-items-center">
                            <img src="img/logo.png" alt="Kidney Precision Medicine Project Data Lake Uploader" className="logo" />
                            <span className="ml-2">Data Lake Uploader</span>
                        </NavbarBrand>
                    </Link>
                </Col>
                <Col sm={6} className="d-none d-md-block">
                    <NavUser displayName={name}/>
                </Col>
            </Navbar>
        );
    }
}

export default NavBar;
