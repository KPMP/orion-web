import React, { Component } from 'react';
import NavButton from './NavButton';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

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
            <Navbar fluid className="nav-container">
                <Navbar.Header>
                    <Navbar.Brand>
                        <img src="img/logo_KPMP-Data-Lake-Uploader.png" alt="Kidney Precision Medicine Project Data Lake Uploader" className="logo" />
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav className="nav-route pull-left">
                    <NavItem>
                        <NavButton name={panes.packages} selected={this.props.pane} onClick={this.props.handlePaneSelect} disable={this.props.isUploading}/>
                    </NavItem>
                    <NavItem>
                        <NavButton name={panes.upload} selected={this.props.pane} onClick={this.props.handlePaneSelect} disable={this.props.isUploading}/>
                    </NavItem>
                </Nav>
                <Nav pullRight>
                    <Navbar.Text>
                        {this.props.displayName}
                    </Navbar.Text>
                    <Navbar.Text>
                        <a href="/Shibboleth.sso/Logout?return=/Shibboleth.sso/Login">Sign out</a>
                    </Navbar.Text>
                </Nav>
            </Navbar>
        );
    }
}

export default NavBar;