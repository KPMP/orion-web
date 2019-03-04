import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SelectBox from './FormComponents/SelectBox';
import TextField from './FormComponents/TextField';
import TextArea from './FormComponents/TextArea';
import DateField from './FormComponents/DateField';
import SubmitterInformation from './FormComponents/SubmitterInformation';

const FIELD_TYPES = {
		DATE_FIELD: "DATE",
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

const requiredFieldDateOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: true, message: 'Required', whitespace: true, min: 1, type: 'date'}]};
const optionalFieldDateOptions = {validateTrigger: ['onBlur', 'onChange' ], rules: [{required: false, type: 'date'}]};

export class DynamicFormGenerator {
	
	renderSection = (sectionJson, form, userInformation) => {
		return (
			<section>
				<h2>{sectionJson.sectionHeader}</h2>
				<Row>
					{ sectionJson.fields.map((fieldJson) => this.renderField(fieldJson, form, userInformation)) }
				</Row>
				<hr/>
			</section>
		);
	}

	renderField = (fieldJson, form, userInformation) => {
		let fieldComponent = null;
		let	fieldOptions = fieldJson.required ? requiredFieldOptions : optionalFieldOptions; 
		let	colLg = 4; 
		let	colMd = 6; 
		let	colSm = 12;
		let options = {};
		switch (fieldJson.type.toUpperCase()) {
			
			case FIELD_TYPES.DATE_FIELD:
				fieldOptions = fieldJson.required ? requiredFieldDateOptions : optionalFieldDateOptions; 
				fieldComponent =
					<DateField label={fieldJson.label} 
						form={form} 
						additionalProps={fieldJson.additionalProps} 
						fieldOptions={fieldOptions}
						fieldName={fieldJson.fieldName}/>;
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
						form={form} />;
				break;
				
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
						form={form} />;
				break;
				
			case FIELD_TYPES.SUBMITTER_INFORMATION:
				return <SubmitterInformation userInformation={userInformation} form={form} />;
						
			case FIELD_TYPES.TEXT_FIELD:
				fieldComponent = 
					<TextField 
						label={fieldJson.label} 
						fieldName={fieldJson.fieldName} 
						fieldOptions={fieldOptions} 
						form={form} />;
				break;
				
			case FIELD_TYPES.TEXT_AREA:
				fieldComponent = <TextArea
					label={fieldJson.label} 
					fieldName={fieldJson.fieldName} 
					fieldOptions={fieldOptions} 
					form={form} />;
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
	
	
}


