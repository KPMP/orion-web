import React, { Component } from 'react';
import { Form } from 'antd';
import DTD from '../../dynamicFormsDTD';
import { DynamicFormGenerator } from './dynamicFormGenerator';
import { Row, Col } from 'react-bootstrap';
import FileDropzone from './FileDropzone';

class UniversalHeaderForm extends Component {
	
	constructor(props) {
		super(props);
		let formGenerator = new DynamicFormGenerator();
		this.renderSection = formGenerator.renderSection.bind(this);
		this.renderField = formGenerator.renderField.bind(this);
	}
	
	render() {
		return (
			<section id="dynamicUploadForm"  className="container justify-content-center">
				<Row className="dropzone">
					<Col md={12}>
						<FileDropzone uploader={this.props.uploader} isUploading={this.props.isUploading}/>
					</Col>
				</Row>
				<hr/>
				{this.renderSection(DTD.standardFields, this.props.form, this.props.userInformation)}
			</section>
		);
	}
	
}

const WrappedUniversalHeaderForm = Form.create({ name: 'universalHeader', validateMessage: "Required" })(UniversalHeaderForm);

export default WrappedUniversalHeaderForm;