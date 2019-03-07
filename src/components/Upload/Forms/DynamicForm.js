import React, { Component } from 'react';
import { Form, Button } from 'antd';
import DTD from '../../dynamicFormsDTD';
import { DynamicFormGenerator } from './dynamicFormGenerator';
import { Row, Col } from 'reactstrap';
import FileDropzone from './FileDropzone';

class DynamicForm extends Component {
	
	constructor(props) {
		super(props);
		let formGenerator = new DynamicFormGenerator();
		this.renderSection = formGenerator.renderSection.bind(this);
		this.renderField = formGenerator.renderField.bind(this);
	}
	
	render() {
		
		let { getFieldValue } = this.props.form;
		let dynamicFormElements = [];
		let dynamicSections = null;
		if (getFieldValue('packageType') !== undefined) {
			dynamicFormElements = DTD.typeSpecificElements.filter(function(element) { return element.hasOwnProperty(getFieldValue('packageType')) });
			if (dynamicFormElements.length > 0) {
				dynamicFormElements = dynamicFormElements[0][getFieldValue('packageType')];
				dynamicSections = dynamicFormElements.sections.map((section) => {
					return this.renderSection(section, this.props.form, this.props.userInformation);
				})
			}
		}
		
		return (
			<section id="dynamicUploadForm"  className="container justify-content-center pt-4">
				<Row className="dropzone">
					<Col md={12}>
						<FileDropzone uploader={this.props.uploader} isUploading={this.props.isUploading}/>
					</Col>
				</Row>
				<hr/>
				{this.renderSection(DTD.standardFields, this.props.form, this.props.userInformation)}
				{dynamicSections}
				<Row className="submit-button-row">
					<Col md={12}>
						<Button id="submit" disabled={true}>Submit</Button>
					</Col>
				</Row>
			</section>
		);
	}
	
}

const WrappedUniversalHeaderForm = Form.create({ name: 'universalHeader', validateMessage: "Required" })(DynamicForm);

export default WrappedUniversalHeaderForm;