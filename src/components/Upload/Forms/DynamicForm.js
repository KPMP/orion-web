import React, { Component } from 'react';
import { Form } from 'antd';
import DTD from '../../dynamicFormsDTD';
import { DynamicFormGenerator } from './dynamicFormGenerator';
import { Row, Col } from 'react-bootstrap';
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
					console.log(this.renderSection(section, this.props.form, this.props.userInformation));
					return this.renderSection(section, this.props.form, this.props.userInformation);
				})
			}
		}
		
		return (
			<section id="dynamicUploadForm"  className="container justify-content-center">
				<Row className="dropzone">
					<Col md={12}>
						<FileDropzone uploader={this.props.uploader} isUploading={this.props.isUploading}/>
					</Col>
				</Row>
				<hr/>
				{this.renderSection(DTD.standardFields, this.props.form, this.props.userInformation)}
				{dynamicSections}
			</section>
		);
	}
	
}

const WrappedUniversalHeaderForm = Form.create({ name: 'universalHeader', validateMessage: "Required" })(DynamicForm);

export default WrappedUniversalHeaderForm;