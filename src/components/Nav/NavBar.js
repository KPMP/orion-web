import React, { Component } from 'react';
import NavButton from './NavButton';
import { Navbar, Col, Row } from 'react-bootstrap';

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
                <Row className="nav-container container-fluid">
                    <Col sm={4}>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <img src="img/logo_KPMP-Data-Lake-Uploader.png" alt="Kidney Precision Medicine Project Data Lake Uploader" className="logo" />
                            </Navbar.Brand>
                        </Navbar.Header>
                    </Col>
                    <Col sm={4}>
                        <div className="nav-route">
                            <NavButton name={panes.packages} selected={this.props.pane} onClick={this.props.handlePaneSelect} disable={this.props.isUploading}/>
                            <NavButton name={panes.upload} selected={this.props.pane} onClick={this.props.handlePaneSelect} disable={this.props.isUploading}/>
                        </div>
                    </Col>
                    <Col sm={4}>
                        <div className="nav-user">
                            {this.props.displayName} &nbsp; <a href="/Shibboleth.sso/Logout?return=/Shibboleth.sso/Login">Sign out</a>
                        </div>
                    </Col>
                </Row>
        );
    }
}

export default NavBar;