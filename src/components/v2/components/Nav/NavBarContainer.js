import React, { Component } from 'react';
import NavButton from './NavButton';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export const panes = {
    packages: 'Packages',
    upload: 'Upload'
}

class UploaderContainer extends Component {
    render() {
        return (
            <Navbar fluid className="nav-container">
                <Navbar.Header>
                    <Navbar.Brand>
                        <img src="img/KPMP-DataPortal-bigger.jpg" alt="logo" width="100%" height="auto" />
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav className="nav-route">
                    <NavItem>
                        <NavButton name={panes.packages} selected={this.props.pane} onClick={this.props.handlePaneSelect}/>
                    </NavItem>
                    <NavItem>
                        <NavButton name={panes.upload} selected={this.props.pane} onClick={this.props.handlePaneSelect}/>
                    </NavItem>
                </Nav>
                <Nav pullRight>
                    <Navbar.Text>
                        John Smith
                    </Navbar.Text>
                    <Navbar.Text>
                        Sign out
                    </Navbar.Text>
                </Nav>
            </Navbar>
        );
    }
}

export default UploaderContainer;