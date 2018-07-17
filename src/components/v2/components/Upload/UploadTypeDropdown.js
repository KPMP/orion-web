import React, { Component } from 'react';
import { DropdownButton } from 'react-bootstrap'
import UploadTypeDropdownItem from './UploadTypeDropdownItem'
import SubSegmentRNASeq from './Types/SubSegmentRNASeq';
import Types from './Types/Types';

export const titles = {
    [Types.Default]: 'Select',
    [Types.SubSegmentRNASeq]: 'Sub-segment RNASeq'
};

class UploadTypeDropdown extends Component {
    render() {
        return (
            <DropdownButton
                bsStyle="default"
                title={this.props.title}
                className="dd-gray-text"
                id="upload-type-dd"
            >
                <UploadTypeDropdownItem eventKey="1" comp={SubSegmentRNASeq} onSelect={this.props.onSelect} name={titles[SubSegmentRNASeq.Type]} />
            </DropdownButton>
        )
    }
}

export default UploadTypeDropdown;