import React, { Component } from 'react';
import { Form, Button } from 'antd';
import { DynamicFormGenerator } from './DynamicFormGenerator';
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
			dynamicFormElements = this.props.formDTD.typeSpecificElements.filter(function(element) { return element.hasOwnProperty(getFieldValue('packageType')) });
			if (dynamicFormElements.length > 0) {
				dynamicFormElements = dynamicFormElements[0][getFieldValue('packageType')];
				dynamicSections = dynamicFormElements.sections.map((section) => {
					return this.renderSection(section, this.props.form, this.props.userInformation);
				})
			}
		}
		
		return (
			<section id="dynamicUploadForm" className="container justify-content-center pt-4">
				{this.renderSection(this.props.formDTD.standardFields, this.props.form, this.props.userInformation)}
				{dynamicSections}
                <hr/>
                <Row className="dropzone btn-sm">
                    <Col md={12}>
                        <FileDropzone uploader={this.props.uploader} isUploading={this.props.isUploading}/>
                    </Col>
                </Row>
        		<Row className="fixed-bottom pt-4" id="form-footer">
        			<div className="container justify-content-center">
	        			<Row className="text-center">
		                    <Col md={12}>
		                        <Button id="cancel" className="mr-3">Cancel</Button>
		                        <Button id="submit" type="primary">Upload</Button>
		                    </Col>
	                    </Row>
                    </div>
                </Row>
			</section>
		);
	}
	
}

const WrappedUniversalHeaderForm = Form.create({ name: 'universalHeader', validateMessage: "Required" })(DynamicForm);

export default WrappedUniversalHeaderForm;