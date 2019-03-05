import React, { Component } from 'react';
import NavButton from './NavButton';
import { Navbar, NavbarBrand, Col, Row } from 'reactstrap';

export const panes = {
    packages: 'Packages',
    upload: 'Upload'
}

class NavBar extends Component {
    render() {
        let name = this.props.displayName;
        if (name === "") {
        		name = this.props.firstName + " " + this.props.lastName;
        }
    		return (
                <Navbar className="px-1 py-1 fixed-top">
                    <Col sm={4}>
                        <div className="navbar-header">
                            <NavbarBrand >
                                <img src="img/logo_KPMP-Data-Lake-Uploader.png" alt="Kidney Precision Medicine Project Data Lake Uploader" className="logo" />
                            </NavbarBrand>
                        </div>
                    </Col>
                    <Col sm={4}>
                        <div className="text-center">
                            <NavButton name={panes.packages} selected={this.props.pane} onClick={this.props.handlePaneSelect} disable={this.props.isUploading}/>
                            <NavButton name={panes.upload} selected={this.props.pane} onClick={this.props.handlePaneSelect} disable={this.props.isUploading}/>
                        </div>
                    </Col>
                    <Col sm={4}>
                        <div className="text-right">
                            {this.props.displayName} &nbsp; <a href="/Shibboleth.sso/Logout?return=/Shibboleth.sso/Login">Sign out</a>
                        </div>
                    </Col>
                </Navbar>
        );
    }
}

export default NavBar;