import React, { Component } from 'react';
import { MenuItem } from 'react-bootstrap'

class FilterDropdownItem extends Component {
    onClick = () => {
        const addFilter = this.props.addFilter;
        if (addFilter) {
            addFilter(this.props.comp);
        }
    }

    render() {
        return <MenuItem eventKey={this.props.eventKey} onClick={this.onClick}>{this.props.name}</MenuItem>
    }
}

export default FilterDropdownItem;