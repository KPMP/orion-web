import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SelectBox from './FormComponents/SelectBox';
import TextField from './FormComponents/TextField';
import NumericField from './FormComponents/NumericField';
import TextArea from './FormComponents/TextArea';
import DateField from './FormComponents/DateField';
import SubmitterInformation from './FormComponents/SubmitterInformation';

const FIELD_TYPES = {
		DATE_FIELD: "DATE",
		DROP_DOWN: "DROP-DOWN", 
		MULTI_SELECT: "MULTI-SELECT",
		SUBMITTER_INFORMATION: "SUBMITTER INFORMATION",
		TEXT_FIELD: "TEXT FIELD", 
		TEXT_AREA: "TEXT AREA" ,
		NUMERIC: "NUMERIC"
};

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
		let	colLg = 4; 
		let	colMd = 6; 
		let	colSm = 12;
		let options = {};
		switch (fieldJson.type.toUpperCase()) {

			case FIELD_TYPES.NUMERIC:
                fieldComponent =
                    <NumericField label={fieldJson.label}
					   form={form}
					   additionalProps={fieldJson.additionalProps}
					   isRequired={fieldJson.required}
					   fieldName={fieldJson.fieldName}/>;
				break;

			case FIELD_TYPES.DATE_FIELD:
                fieldComponent =
					<DateField label={fieldJson.label} 
						form={form} 
						additionalProps={fieldJson.additionalProps}
					    isRequired={fieldJson.required}
						fieldName={fieldJson.fieldName}/>;
				break;
			case FIELD_TYPES.DROP_DOWN:			
				options = fieldJson.values.map((element) => {
					return {label: element, value: element};
				});
				
				fieldComponent =
					<SelectBox
                        form={form}
						label={fieldJson.label} 
						fieldName={fieldJson.fieldName}
						isMultiple={false}
						isRequired={fieldJson.required}
						options={options} />;
				break;
				
			case FIELD_TYPES.MULTI_SELECT:
				options = fieldJson.values.map((element) => {
					return {label: element, value: element};
				});
				
				fieldComponent =
					<SelectBox
                        form={form}
                        isMultiple={true}
						label={fieldJson.label} 
						fieldName={fieldJson.fieldName}
						isRequired={fieldJson.required}
						options={options}/>;
				break;
				
			case FIELD_TYPES.SUBMITTER_INFORMATION:
				return <SubmitterInformation userInformation={userInformation} form={form} />;
						
			case FIELD_TYPES.TEXT_FIELD:
				fieldComponent = 
					<TextField
                        form={form}
                        label={fieldJson.label}
						fieldName={fieldJson.fieldName}
						isRequired={fieldJson.required}/>;
				break;
				
			case FIELD_TYPES.TEXT_AREA:
				fieldComponent = <TextArea
                    form={form}
                    label={fieldJson.label}
					fieldName={fieldJson.fieldName}
					isRequired={fieldJson.required}/>;
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