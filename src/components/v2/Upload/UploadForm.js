import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import DefaultUploadForm from './Forms/DefaultUploadForm';
import V1StyleForm from './Forms/V1StyleForm';
import FileDropzone from './Forms/FileDropzone';
import UploadControl from './UploadControl';
import { Formik } from 'formik';
import { validate } from './Forms/v1StyleFormValidator';
import { uploader } from './fineUploader';
import qq from 'fine-uploader/lib/core';


class UploadForm extends Component {
	
    constructor(props) {
        super(props);
        this.state = {
            packageType: 'Select',
            packageTypeOther: '',
            filesAdded: 0
        };
        uploader.on('submit', () => {
        		let newCount = this.state.filesAdded + 1;
        		this.setState( { filesAdded: newCount } );
        		return true;
        });
        uploader.on('cancel', () => {
        		let newCount = this.state.filesAdded - 1;
        		this.setState( { filesAdded: newCount });
        		return true;
        })
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
    		if (Object.keys(errors).length === 0 && this.state.filesAdded > 0) {
    			return false;
    		}
    		return true;
    }
    
    handleSubmit = () => {
    	
    }
    
	render() {
		const {
			values, touched, errors, handleChange, setFieldValue, handleBlur, handleSubmit, handleSelect
		} = this.props;
		
		const uploadPackage = {
			packageType: values.packageType,
			packageTypeOther: values.packageTypeOther,
			submitterFirstName: values.submitterFirstName,
			submitterLastName: values.submitterLastName,
			institutionName: values.institutionName,
			protocol: values.protocol,
			experimentDate: values.experimentDate,
			description: values.description,
			subjectId: values.subjectId
		}
		
		if (values.packageType === undefined) {
			return (
				<div>
					<UploadControl title={this.props.title} handleSelect={handleSelect} handlePackageTypeOther={this.handlePackageTypeOther} submitDisabled={true} {...this.props}/>
					<hr/>
					<DefaultUploadForm/> 
				</div>
			);
		} else {
			return (
				<form id="uploadPackageInfoForm" onSubmit={handleSubmit}>
					<div id="uploadForm">
					<UploadControl title={this.props.title} handleSelect={handleSelect} handlePackageTypeOther={this.handlePackageTypeOther} submitDisabled={true} {...this.props}/>
						<hr/>
						<Row className="dropzone">
							<Col md={12}>
								<FileDropzone uploader={uploader}/>
							</Col>
						</Row>
						<Row>
							<Col md={12}>
								<V1StyleForm uploadPackage={uploadPackage} {...this.props}/>
							</Col>
						</Row>
					</div>
				</form>
			);
		}
	}
}

const Form = (props) => {

	return (
		<div>
			<Formik initialValues={props.uploadPackage} component={UploadForm} validate={(values) => validate} onSubmit={(values, {setSubmitting, setErrors}) => {props.postPackageInformation(values)}}/>
		</div>
	);
}

export default Form;