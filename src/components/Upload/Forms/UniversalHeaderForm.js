import React, { Component } from 'react';
import SelectBox from '../SelectBox';
import TextField from '../TextField';
import { Row, Col } from 'react-bootstrap';	
import { Form, Input, DatePicker, Button } from 'antd';
import DTD from '../../dynamicFormsDTD';

const FIELD_TYPES = {
	DROP_DOWN: "DROP-DOWN"
	, TEXT_FIELD: "TEXT FIELD"
	, TEXT_AREA: "TEXT AREA"
	, MULTI_SELECT: "MULTI-SELECT"
};

const requiredFieldOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: true, message: 'Required', whitespace: true, min: 1}]};

const optionalFieldOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: false}]};

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
		let fieldComponent = null, 
			fieldOptions = fieldJson.required ? requiredFieldOptions : optionalFieldOptions, 
			colLg = 4, 
			colMd = 6, 
			colSm = 12;
		
		console.log(fieldJson.fieldName, '<- fieldName');
		
		switch (fieldJson.type.toUpperCase()) {
		case FIELD_TYPES.MULTI_SELECT:
			fieldComponent = <h3>{fieldJson.label}, Multiselect</h3>;
			break;
			
		case FIELD_TYPES.DROP_DOWN:			
			let options = fieldJson.values.map((elem) => {
				return {label: elem, value: elem};
				});
			
			fieldComponent =
				<SelectBox 
					//className="filter-control"
					label={fieldJson.label} 
					fieldName={fieldJson.fieldName} 
					options={options} 
					fieldOptions={fieldOptions}
					form={this.props.form} />;
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
			fieldComponent = <h3>{fieldJson.label}, Text Area</h3>;
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