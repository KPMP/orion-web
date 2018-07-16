import React, { Component } from 'react';
import { FormGroup, InputGroup, FormControl } from 'react-bootstrap';

class PackageSearchBar extends Component {
    render() {
        return (
            <FormGroup className="pkg-filter">
                <InputGroup>
                    <InputGroup.Addon className="search-glass">
                        <span className="glyphicon glyphicon-search"/>
                    </InputGroup.Addon>
                    <FormControl id="pkg-search-bar" type="text" placeholder="Search for..." />
                </InputGroup>
            </FormGroup>
        ) 
    }
}

export default PackageSearchBar;