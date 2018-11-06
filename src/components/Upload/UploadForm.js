import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import DefaultUploadForm from './Forms/DefaultUploadForm';
import V1StyleForm from './Forms/V1StyleForm';
import FileDropzone from './Forms/FileDropzone';
import UploadControl from './UploadControl';
import { Formik } from 'formik';
import { validate } from './Forms/v1StyleFormValidator';
import qq from 'fine-uploader/lib/core';
import { uploader } from './fineUploader';

class UploadForm extends Component {
	
    constructor(props) {
        super(props);
        this.state = {
            filesAdded: 0,
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
        });
        uploader.on('submit', (id, name) => {
        		let files = uploader.methods.getUploads({
	            status: [ qq.status.SUBMITTED, qq.status.PAUSED ]});
        		for(let fileIndex in files) {
        			let existingName = files[fileIndex].name;
        			if (existingName === name) {
        				alert("You have already selected " + existingName + " to upload.");
        				return false;
        			}
        			
        		}
        		return true;
        });
    }

    isSubmitDisabled = (values) => {
    		let errors = validate(values);
    		if (this.props.isUploading) {
    			return true;
    		} else if (Object.keys(errors).length === 0 && this.state.filesAdded > 0) {
    			return false;
    		}
    		return true;
    }

	componentWillMount() {
		uploader.methods.reset();
	}
    
	render() {
		const {
			values, handleSubmit
		} = this.props;
		return (
			<div>
				<form id="uploadPackageInfoForm" onSubmit={handleSubmit}>
					<UploadControl {...this.props}/>
					<hr/>
					{ values.packageType === undefined && <DefaultUploadForm/> }
					{ values.packageType !== undefined && 
						<div id="uploadForm">
							<Row className="dropzone">
								<Col md={12}>
									<FileDropzone uploader={uploader} isUploading={this.props.isUploading}/>
								</Col>
							</Row>
							<Row>
								<Col md={12}>
									<V1StyleForm {...this.props}/>
								</Col>
							</Row>
							<hr/>
							<Row>
								<Col md={12} className="text-center">
									<Button className="btn-primary uploadFormSubmit" disabled={this.isSubmitDisabled(values)} type="submit">
										Submit
									</Button>
								</Col>
							</Row>
						</div>
					}
				</form>
			</div>
		);
	}
}

const Form = (props) => {
	return (
		<div>
			<Formik initialValues={{ 'submitterFirstName': props.userInformation.firstName, 'submitterLastName': props.userInformation.lastName, 'submitterEmail': props.userInformation.email}} render={formikProps => <UploadForm {...formikProps} isUploading={props.isUploading} userInformation={props.userInformation}/>}
				onSubmit={(values, {setSubmitting, setErrors}) => {props.postPackageInformation(values, uploader)}} 
				validateOnChange={true} validateOnBlur={true} />
		</div>
	);
}

export default Form;