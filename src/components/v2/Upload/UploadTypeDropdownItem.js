import React, { Component } from 'react';
import { MenuItem } from 'react-bootstrap';

class UploadTypeDropdownItem extends Component {
    handleSelect = () => {
        const onSelect = this.props.onSelect;
        if (onSelect) {
            onSelect(this.props.name);
        }
    }

    render() {
        return <MenuItem eventKey={this.props.eventKey} onSelect={this.handleSelect}>{this.props.name}</MenuItem>;
    }
}

export default UploadTypeDropdownItem;