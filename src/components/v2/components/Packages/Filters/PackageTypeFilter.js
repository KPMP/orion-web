import React, { Component } from 'react';
import { DropdownButton, InputGroup, MenuItem } from 'react-bootstrap';

class PackageTypeFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '(any)'
        };
    }

    render() {
        return (
            <InputGroup className="pkg-filter">
                <InputGroup.Addon>Pkg Type:</InputGroup.Addon>
                <DropdownButton
                    title={this.state.title}
                >
                    <MenuItem eventKey="1">Package Type 1</MenuItem>
                    <MenuItem eventKey="2">Package Type 2</MenuItem>
                    <MenuItem eventKey="3">Package Type 3</MenuItem>
                    <MenuItem eventKey="4">Package Type 4</MenuItem>
                    <MenuItem eventKey="5">etc...</MenuItem>
                </DropdownButton>
            </InputGroup>
        );
    }
}

export default PackageTypeFilter;