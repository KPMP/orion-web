import React, { Component } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import PropTypes from 'prop-types';

class NavUser extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        return (
            <Dropdown isOpen={this.state.dropdownOpen}
                      toggle={this.toggle}
                      inNavbar
                      direction="down"
                      className="float-right col-sm-0">
                <DropdownToggle caret tag="a" className="text-dark"
                >{this.props.displayName}</DropdownToggle>
                <DropdownMenu id="nav-user-dropdown-menu">
                        <DropdownItem tag="a" target="_blank" href="https://kpmp.org/data-uploader-help/">
                            Help
                        </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem tag="a"
                        onClick={() => {window.location.href = "/Shibboleth.sso/Logout?return=/Shibboleth.sso/Login"; }}
                        >Sign Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }
}

NavUser.propTypes = {
    displayName: PropTypes.string.isRequired
};

export default NavUser;