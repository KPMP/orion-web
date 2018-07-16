import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap'
import PackageTypeFilter from './PackageTypeFilter';
import FilterDropdownItem from './FilterDropdownItem';

class FilterDropdown extends Component {
    addTypeFilter = () => {
        const addFilter = this.props.addFilter;
        if (addFilter) {
            addFilter(PackageTypeFilter);
        }
    }

    render() {
        return (
            <DropdownButton
                bsStyle="Add filter"
                title="Add filter"
                id="pkg-filter-dd"
            >
                <FilterDropdownItem eventKey="1" name="Select package type" comp={PackageTypeFilter} />
                <MenuItem eventKey="2">Select site name</MenuItem>
                <MenuItem eventKey="3">Select submitter</MenuItem>
                <MenuItem eventKey="4">Filter 4</MenuItem>
                <MenuItem eventKey="5">Filter 5</MenuItem>
            </DropdownButton>
        );
    }
}

export default FilterDropdown;