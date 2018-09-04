import React, { Component } from 'react';
import { DropdownButton } from 'react-bootstrap'
import UploadTypeDropdownItem from './UploadTypeDropdownItem'

class UploadTypeDropdown extends Component {
    render() {
        return (
            <DropdownButton
                bsStyle="default"
                title={this.props.title}
                className="packageTypeSelect"
                id="upload-type-dd"
            >
                <UploadTypeDropdownItem eventKey="1" onSelect={this.props.onSelect} name='Sub-segment RNASeq' />
                	<UploadTypeDropdownItem eventKey="2" onSelect={this.props.onSelect} name='Sub-segment RNASeq' />
            		<UploadTypeDropdownItem eventKey="3" onSelect={this.props.onSelect} name='Sub-segment RNASeq' />
        			<UploadTypeDropdownItem eventKey="4" onSelect={this.props.onSelect} name='Sub-segment RNASeq' />
            </DropdownButton>
        )
    }
}

export default UploadTypeDropdown;