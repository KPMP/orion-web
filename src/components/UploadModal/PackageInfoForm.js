import React, { Component } from 'react';
import { Form, Field, reduxForm } from 'redux-form';
import { ControlLabel, Button } from 'react-bootstrap';
import TextField from './TextField';
import SelectBox from './SelectBox';
import ReduxDatePicker from './ReduxDatePicker';

const validate = (values) => {
	const errors = {};
	if(!values.firstName) {
		errors.firstName = '* Required';
	}
	if (!values.lastName) {
		errors.lastName = '* Required';
	}
	if(!values.institutionName) {
		errors.institutionName = '* Required';
	}
	if(!values.packageType) {
		errors.packageType = '* Required';
	}
	if (!values.packageTypeOther && values.packageType === "Other") {
		errors.packageTypeOther = "* Required";
	}
	return errors;
}

class PackageInfoForm extends Component {
    render() {
        const { handleSubmit, onSubmit } = this.props;
        let institutionOptions = [ {'value': 'Broad (Michigan/Broad/Princeton TIS)', 'label': 'Broad (Michigan/Broad/Princeton TIS)'},
        		{'value': 'EMBL (UTHSA/EMBL/PNNL/UCSD TIS)', 'label': 'EMBL (UTHSA/EMBL/PNNL/UCSD TIS)'},
        		{'value': 'Indiana (IU/OSU TIS)', 'label': 'Indiana (IU/OSU TIS)'},
        		{'value': 'Michigan (Michigan/Broad/Princeton TIS)', 'label': 'Michigan (Michigan/Broad/Princeton TIS)'},
        		{'value': 'OSU (IU/OSU TIS)', 'label': 'OSU (IU/OSU TIS)'},
        		{'value': 'PNNL (UTHSA/EMBL/PNNL/UCSD TIS)', 'label': 'PNNL (UTHSA/EMBL/PNNL/UCSD TIS)'},
        		{'value': 'Princeton (Michigan/Broad/Princeton TIS)', 'label': 'Princeton (Michigan/Broad/Princeton TIS)'},
        		{'value': 'Stanford (UCSF/Stanford TIS)', 'label': 'Stanford (UCSF/Stanford TIS)'},
        		{'value': 'UCSD (UCSD/WashU TIS)', 'label': 'UCSD (UCSD/WashU TIS)'},
        		{'value': 'UCSD (UTHSA/EMBL/PNNL/UCSD TIS)', 'label': 'UCSD (UTHSA/EMBL/PNNL/UCSD TIS)'},
        		{'value': 'UCSF (UCSF/Stanford TIS)', 'label': 'UCSF (UCSF/Stanford TIS)'},
        		{'value': 'UTHSA (UTHSA/EMBL/PNNL/UCSD TIS)', 'label': 'UTHSA (UTHSA/EMBL/PNNL/UCSD TIS)'},
        		{'value': 'WashU (UCSD/WashU TIS)', 'label': 'WashU (UCSD/WashU TIS)'},
        	];
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
        		{'value': 'Other', 'label': 'Other'},
        ];
       
        return (
            <Form onSubmit={handleSubmit(onSubmit)} name="uploadPackageInfoForm" id="uploadPackageInfoForm">
                <div className="modalTitle" id="uploadInfoHeader">Upload Information</div>
                <div id="uploadInfo">
                    <div className="form-group">
                        <Field name="firstName" component={TextField} label="First Name" type="text"/>
                    </div>
                    <div className="form-group">
                        <Field name="lastName" component={TextField} label="Last Name" type="text" />
                    </div>
                    <div className="form-group">
                        <Field name="institutionName" label="Site Name" className="form-control" component={SelectBox} options={institutionOptions} />
                    </div>
                    <div className="form-group">
                        <Field name="packageType" className="form-control" label="Package Type" component={SelectBox} options={packageTypes} />
                    </div>
                    
                    <div className="form-group">
                        <ControlLabel>Subject # (optional)</ControlLabel>
                        <Field name="subjectId" className="form-control" component="input" type="text" />
                    </div>
                    <div className="centerBold">-OR-</div>
                    <div className="form-group">
                        <ControlLabel>Experiment # (optional)</ControlLabel>
                        <Field name="experimentId" className="form-control" component="input" type="text" />
                    </div>
                    <div className="form-group"> 
                        <ControlLabel>Experiment Date (optional)</ControlLabel>
                        <Field name="experimentDate" className="form-control" component={ReduxDatePicker}/>
                    </div>
                </div>
                <div className="row">
                		<div className="buttonRow">
	                    <div className="col-sm-6">
	                        <Button className="btn-outline-dark pull-left" onClick={() => this.props.cancel()}>Cancel</Button>
	                    </div>
	                    <div className="col-sm-6">
	                        <Button bsStyle="primary" className="pull-right" onClick={() => this.props.changeUploadTab(1)} disabled={!this.props.valid}>Next</Button>
	                    </div>
                    </div>
                </div>
            </Form>
            
        );
    }
}

export default reduxForm({
    form: 'uploadPackageInfoForm',
    validate,
    touchOnBlur: true,
    touchOnChange: true
})(PackageInfoForm);
