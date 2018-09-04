import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import DefaultUploadForm from './Forms/DefaultUploadForm';
import V1StyleForm from './Forms/V1StyleForm';
import FileDropzone from './Forms/FileDropzone';

class UploadForm extends Component {
	render() {
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
							<V1StyleForm/>
						</Col>
					</Row>
				</div>
			);
		}
	}
}

export default UploadForm;