import React, { Component } from 'react';
import SelectBox from './FormComponents/SelectBox';
import TextField from './FormComponents/TextField';
import TextArea from './FormComponents/TextArea';
import SubmitterInformation from './FormComponents/SubmitterInformation';
import { Row, Col } from 'react-bootstrap';	
import { Form, Input, DatePicker, Button } from 'antd';
import DTD from '../../dynamicFormsDTD';

const FIELD_TYPES = {
	DROP_DOWN: "DROP-DOWN", 
	MULTI_SELECT: "MULTI-SELECT",
	SUBMITTER_INFORMATION: "SUBMITTER INFORMATION",
	TEXT_FIELD: "TEXT FIELD", 
	TEXT_AREA: "TEXT AREA" 
};

const requiredFieldOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: true, message: 'Required', whitespace: true, min: 1}]};
const optionalFieldOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: false}]};

const requiredFieldArrayOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: true, message: 'Required', whitespace: true, min: 1, type: 'array'}]};
const optionalFieldArrayOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: false, type: 'array'}]};

class UniversalHeaderForm extends Component {
	
	constructor(props) {
		super(props);
		
		this.renderSection = this.renderSection.bind(this);
		this.renderField = this.renderField.bind(this);
	}
	
	/**
	 * Renders a section with heading and fields
	 */
	renderSection(sectionJson) {
		return (
			<section className="container justify-content-center">
				<h2>{sectionJson.sectionHeader}</h2>
				<Row>
					{ sectionJson.fields.map(this.renderField) }
				</Row>
			</section>
		);
	}
	
	/**
	 * Render configured react components with field configuration JSON
	 */
	renderField(fieldJson) {
		let fieldComponent = null;
		let	fieldOptions = fieldJson.required ? requiredFieldOptions : optionalFieldOptions; 
		let	colLg = 4; 
		let	colMd = 6; 
		let	colSm = 12;
		let options = {};
		switch (fieldJson.type.toUpperCase()) {
			case FIELD_TYPES.MULTI_SELECT:
				fieldOptions = fieldJson.required ? requiredFieldArrayOptions : optionalFieldArrayOptions; 
				options = fieldJson.values.map((element) => {
					return {label: element, value: element};
				});
				
				fieldComponent =
					<SelectBox 
						isMultiple={true}
						label={fieldJson.label} 
						fieldName={fieldJson.fieldName} 
						options={options} 
						fieldOptions={fieldOptions}
						form={this.props.form} />;
				break;
				
			case FIELD_TYPES.DROP_DOWN:			
				options = fieldJson.values.map((element) => {
					return {label: element, value: element};
				});
				
				fieldComponent =
					<SelectBox 
						label={fieldJson.label} 
						fieldName={fieldJson.fieldName} 
						options={options} 
						fieldOptions={fieldOptions}
						form={this.props.form} />;
				break;
			case FIELD_TYPES.SUBMITTER_INFORMATION:
				return <SubmitterInformation {...this.props} />;
				break;
			case FIELD_TYPES.TEXT_FIELD:
				fieldComponent = 
					<TextField 
						label={fieldJson.label} 
						fieldName={fieldJson.fieldName} 
						fieldOptions={fieldOptions} 
						form={this.props.form} />;
				break;
				
			case FIELD_TYPES.TEXT_AREA:
				fieldComponent = <TextArea
					label={fieldJson.label} 
					fieldName={fieldJson.fieldName} 
					fieldOptions={fieldOptions} 
					form={this.props.form} />;
				colLg = 12;
				colMd = 12;
				colSm = 12;
				break;
				
			default:
				fieldComponent = <h3>Type not implemented: {fieldJson.type}</h3>;
				break;
		}
		
		return (
			<Col lg={colLg} md={colMd} sm={colSm}>
				{fieldComponent}
			</Col>
		);
	}
	
	render() {
		return this.renderSection(DTD.standardFields);
	}
	
}

const WrappedUniversalHeaderForm = Form.create({ name: 'universalHeader', validateMessage: "Required" })(UniversalHeaderForm);

export default WrappedUniversalHeaderForm;