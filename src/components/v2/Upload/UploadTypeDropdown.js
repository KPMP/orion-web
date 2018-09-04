import React, { Component } from 'react';
import { DropdownButton } from 'react-bootstrap'
import UploadTypeDropdownItem from './UploadTypeDropdownItem'


let packageTypes = [{'value': 'Sub-segment RNAseq', 'label': 'Sub-segment RNAseq'},
	{'value': 'Single-cell RNAseq', 'label': 'Single-cell RNAseq'},
	{'value': 'Single-nucleus RNAseq', 'label': 'Single-nucleus RNAseq'},
	{'value': 'Bulk RNAseq', 'label': 'Bulk RNAseq'},
	{'value': 'DNA Methylation', 'label': 'DNA Methylation'},
	{'value': 'Segmental miRNA', 'label': 'Segmental miRNA'},
	{'value': 'Multiplex ISH', 'label': 'Multiplex ISH'},
	{'value': 'Sub-segmental Proteomics', 'label': 'Sub-segmental Proteomics'},
	{'value': 'Near-single-cell Proteomics', 'label': 'Near-single-cell Proteomics'},
	{'value': '3-D tissue imaging', 'label': '3-D tissue imaging'},
	{'value': 'Spatial Metabolomics', 'label': 'Spatial Metabolomics'},
	{'value': 'Inflammatory Cells', 'label': 'Inflammatory Cells'},
	{'value': 'Whole Slide Images', 'label': 'Whole Slide Images'},
	{'value': 'Other', 'label': 'Other'},
];

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