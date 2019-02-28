import React, { Component } from 'react';
import SelectBox from '../SelectBox';
import TextField from '../TextField';
import { Row, Col } from 'react-bootstrap';	
import { Form, Input, DatePicker, Button } from 'antd';
import DTD from '../../dynamicFormsDTD';

const FIELD_TYPES = {
	DROP_DOWN: "DROP-DOWN"
	, TEXT_FIELD: "TEXT FIELD"
	, MULTI_SELECT: "MULTI-SELECT"
};

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
			<section>
				<h2>{sectionJson.sectionHeader}</h2>
				<Row>
					{ sectionJson.fields.map(this.renderField) }
				</Row>
			</section>
		);
	}
	
	renderField(fieldJson) {
		//TODO render and return a React component appropriately configured
		let fieldComponent = null;
		
		switch (fieldJson.type.toUpperCase()) {
		case FIELD_TYPES.MULTI_SELECT:
			fieldComponent = <h3>{fieldJson.label}, Multiselect</h3>;
			break;
		case FIELD_TYPES.DROP_DOWN:
			fieldComponent = <h3>{fieldJson.label}, Drop down</h3>;
			break;
		case FIELD_TYPES.TEXT_FIELD:
		default:
			fieldComponent = <h3>{fieldJson.label}, Text Field</h3>;
			break;
		}
		
		console.log(fieldComponent);
		
		return (
			<Col lg={4} md={6} sm={12}>
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