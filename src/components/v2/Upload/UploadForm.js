import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import DefaultUploadForm from './Forms/DefaultUploadForm';
import Form from './Forms/V1StyleUploadFormFormik';
import FileDropzone from './Forms/FileDropzone';

class UploadForm extends Component {
	render() {
		
		const uploadPackage = {
			packageType: this.props.packageType,
			submitterFirstName: '',
			submitterLastName: '',
			institution: '',
			protocol: '',
			experimentDate: null,
			description: '',
			subjectId: ''
		}
		if (this.props.packageType === 'Select') {
			return ( <DefaultUploadForm/> );
		} else {
			return (
				<div>
					<Row className="dropzone">
						<Col md={12}>
							<FileDropzone/>
						</Col>
					</Row>
					<Row>
						<Col md={12}>
							<Form uploadPackage={uploadPackage}/>
						</Col>
					</Row>
				</div>
			);
		}
	}
}

export default UploadForm;