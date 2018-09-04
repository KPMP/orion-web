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
                	<UploadTypeDropdownItem eventKey="2" onSelect={this.props.onSelect} name='Single-cell RNAseq' />
            		<UploadTypeDropdownItem eventKey="3" onSelect={this.props.onSelect} name='Single-nucleus RNAseq' />
        			<UploadTypeDropdownItem eventKey="4" onSelect={this.props.onSelect} name='Bulk RNAseq' />
    				<UploadTypeDropdownItem eventKey="4" onSelect={this.props.onSelect} name='DNA Methylation' />
				<UploadTypeDropdownItem eventKey="4" onSelect={this.props.onSelect} name='Segmental miRNA' />
				<UploadTypeDropdownItem eventKey="4" onSelect={this.props.onSelect} name='Multiplex ISH' />
				<UploadTypeDropdownItem eventKey="4" onSelect={this.props.onSelect} name='Sub-segmental Proteomics' />
				<UploadTypeDropdownItem eventKey="4" onSelect={this.props.onSelect} name='Near-single-cell Proteomics' />
				<UploadTypeDropdownItem eventKey="4" onSelect={this.props.onSelect} name='3-D tissue imaging' />
				<UploadTypeDropdownItem eventKey="4" onSelect={this.props.onSelect} name='Spatial Metabolomics' />
				<UploadTypeDropdownItem eventKey="4" onSelect={this.props.onSelect} name='Inflammatory Cells' />
				<UploadTypeDropdownItem eventKey="4" onSelect={this.props.onSelect} name='Whole Slide Images' />
				<UploadTypeDropdownItem eventKey="4" onSelect={this.props.onSelect} name='Other' />
            </DropdownButton>
        )
    }
}

export default UploadTypeDropdown;