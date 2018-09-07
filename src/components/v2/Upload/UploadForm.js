import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import DefaultUploadForm from './Forms/DefaultUploadForm';
import V1StyleForm from './Forms/V1StyleForm';
import FileDropzone from './Forms/FileDropzone';
import UploadControl from './UploadControl';
import { Formik } from 'formik';
import { validate } from './Forms/v1StyleFormValidator';

class UploadForm extends Component {
	
    constructor(props) {
        super(props);
        this.state = {
            packageType: 'Select',
            packageTypeOther: ''
        };
    }

    handleSelect = (packageType) => {
    		this.setState({
            packageType: packageType
        });
    }
    
    handlePackageTypeOther = (packageTypeOther) => {
    		this.setState({packageTypeOther: packageTypeOther});
    }
    
    isSubmitDisabled = (uploadPackage) => {
    		let errors = validate(uploadPackage);
    		if (Object.keys(errors).length === 0) {
    			return false;
    		}
    		return true;
    }
    
	render() {
		const {
			values, touched, errors, handleChange, setFieldValue, handleBlur
		} = this.props;
		
		let submitEnabled = false;
		const uploadPackage = {
			packageType: this.state.packageType,
			packageTypeOther: this.state.packageTypeOther,
			submitterFirstName: values.submitterFirstName,
			submitterLastName: values.submitterLastName,
			institutionName: values.institutionName,
			protocol: values.protocol,
			experimentDate: values.experimentDate,
			description: values.description,
			subjectId: values.subjectId
		}
		
		if (this.state.packageType === 'Select') {
			return (
				<div>
					<UploadControl title={this.props.title} handleSelect={this.handleSelect} handlePackageTypeOther={this.handlePackageTypeOther} submitDisabled={true} />
					<hr/>
					<DefaultUploadForm/> 
				</div>
			);
		} else {
			return (
				<div id="uploadForm">
					<UploadControl title={this.props.title} handleSelect={this.handleSelect} handlePackageTypeOther={this.handlePackageTypeOther} submitDisabled={this.isSubmitDisabled(uploadPackage)} />	
					<hr/>
					<Row className="dropzone">
						<Col md={12}>
							<FileDropzone/>
						</Col>
					</Row>
					<Row>
						<Col md={12}>
							<V1StyleForm uploadPackage={uploadPackage} {...this.props}/>
						</Col>
					</Row>
				</div>
			);
		}
	}
}

const Form = (props) => {

	return (
		<div>
			<Formik initialValues={props.uploadPackage} component={UploadForm} validate={validate} />
		</div>
	);
}

export default Form;