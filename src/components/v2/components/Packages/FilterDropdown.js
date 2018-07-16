import React, { Component } from 'react';
import { DropdownButton, MenuItem, FormGroup } from 'react-bootstrap'
import PackageTypeFilter from './Filters/PackageTypeFilter';
import FilterDropdownItem from './FilterDropdownItem';

class FilterDropdown extends Component {
    render() {
        return (
            <FormGroup>
                <DropdownButton
                    bsStyle="default"
                    title="Add filter"
                    className="dd-gray-text pkg-filter"
                    id="pkg-search-dd"
                    onClick={this.props.toggle}
                    open={this.props.open}
                >
                    <FilterDropdownItem eventKey="1" name="Select package type" addFilter={this.props.addFilter} comp={PackageTypeFilter} />
                    <MenuItem eventKey="2">Select site name</MenuItem>
                    <MenuItem eventKey="3">Select submitter</MenuItem>
                    <MenuItem eventKey="4">Filter 4</MenuItem>
                    <MenuItem eventKey="5">Filter 5</MenuItem>
                </DropdownButton>
            </FormGroup>
        );
    }
}

export default FilterDropdown;