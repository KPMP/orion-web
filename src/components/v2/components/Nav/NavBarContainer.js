import React, { Component } from 'react';
import NavButton from './NavButton';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';

export const panes = {
    packages: 'Packages',
    upload: 'Upload'
}

class UploaderContainer extends Component {
    render() {
        return (
            <Navbar fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <img src="img/KPMP-DataPortal.jpg" alt="logo"/>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
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
                    <NavItem>
                        <Button className="btn btn-link">
                            Sign out
                        </Button>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default UploaderContainer;