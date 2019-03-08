import React, { Component } from 'react';
import NavButton from './NavButton';
import { Navbar, NavbarBrand, Col } from 'reactstrap';
import NavUser from "./NavUser";

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

        if (name === " ") {
            name = "NO USERNAME";
        }

    		return (
                <Navbar id="navbar" className="px-1 py-1 fixed-top">
                    <Col sm={4}>
                        <div className="navbar-header">
                            <NavbarBrand className="d-flex align-items-center">
                                <img src="img/logo.png" alt="Kidney Precision Medicine Project Data Lake Uploader" className="logo" />
                                <span className="ml-2">Data Lake Uploader</span>
                            </NavbarBrand>
                        </div>
                    </Col>
                    <Col sm={4} className="d-none d-md-block">
                        <div className="text-center">
                            <NavButton name={panes.packages} selected={this.props.pane} onClick={this.props.handlePaneSelect} disable={this.props.isUploading}/>
                            <NavButton name={panes.upload} selected={this.props.pane} onClick={this.props.handlePaneSelect} disable={this.props.isUploading}/>
                        </div>
                    </Col>
                    <Col sm={4} className="d-none d-md-block">
                        <NavUser displayName={name}/>
                    </Col>
                </Navbar>
        );
    }
}

export default NavBar;
