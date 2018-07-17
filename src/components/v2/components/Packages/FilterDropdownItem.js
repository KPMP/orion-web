import React, { Component } from 'react';
import { MenuItem } from 'react-bootstrap'

class FilterDropdownItem extends Component {
    onSelect = () => {
        const addFilter = this.props.addFilter;
        if (addFilter) {
            addFilter(this.props.comp);
        }
    }

    render() {
        return <MenuItem eventKey={this.props.eventKey} onSelect={this.onSelect}>{this.props.name}</MenuItem>
    }
}

export default FilterDropdownItem;