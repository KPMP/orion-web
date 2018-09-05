import React, { Component } from 'react';
import { DropdownButton } from 'react-bootstrap';
import Select from 'react-select';

class UploadTypeDropdown extends Component {
    
	constructor() {
		super();
		this.state = { selectedOption: null };
	}
	
	handleChange = (selectedOption) => {
		this.props.onSelect(selectedOption.value);
		this.setState({ selectedOption });
	}
	
	render() {
    		let { selectedOption } = this.state;
		let options = [{ value: 'Sub-segment RNA-Seq', label: 'Sub-segment RNA-Seq'},
    			{ value: 'Single-cell RNA-Seq', label: 'Single-cell RNA-Seq'},
    			{ value: 'Single-nucleus RNA-Seq', label: 'Single-nucleus RNA-Seq'},
    			{ value: 'Bulk RNA-Seq', label: 'Bulk RNA-Seq'},
    			{ value: 'DNA Methylation', label: 'DNA Methylation'},
    			{ value: 'Segmental miRNA', label: 'Segmental miRNA'},
    			{ value: 'Multiplex ISH', label: 'Multiplex ISH'},
    			{ value: 'Sub-segmental Proteomics', label: 'Sub-segmental Proteomics'},
    			{ value: 'Near-single-cell Proteomics', label: 'Near-single-cell Proteomics'},
    			{ value: '3-D tissue imaging', label: '3-D tissue imaging'},
    			{ value: 'Spatial Metabolomics', label: 'Spatial Metabolomics'},
    			{ value: 'Inflammatory Cells', label: 'Inflammatory Cells'},
    			{ value: 'Whole Slide Images', label: 'Whole Slide Images'},
    			{ value: 'Other', label: 'Other'}
    			];
        return (
            <Select value={selectedOption} onChange={this.handleChange} options={options} className="packageTypeSelect"/>
        )
    }
}

export default UploadTypeDropdown;