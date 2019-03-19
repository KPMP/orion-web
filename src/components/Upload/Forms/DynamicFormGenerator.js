import React from 'react';
import { Row, Col } from 'reactstrap';
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

const OTHER_AVAILABLE_LABEL = 'Other';
const LINKED_WITH = 'linkedWith';

export class DynamicFormGenerator {
	
	renderSection = (inputSectionJson, form, userInformation) => {

		let sectionJson = Object.assign({}, inputSectionJson);

		return (
			<section>
				<h4>{sectionJson.sectionHeader}</h4>
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
		let isDisabled = this.isFieldDisabled(fieldJson, form);
		let isRequired = !isDisabled && fieldJson.required;

		switch (fieldJson.type.toUpperCase()) {

			case FIELD_TYPES.NUMERIC:
                fieldComponent =
                    <NumericField label={fieldJson.label}
					   form={form}
					   additionalProps={fieldJson.additionalProps}
					   isRequired={isRequired}
					   isDisabled={isDisabled}
					   fieldName={fieldJson.fieldName}/>;
				break;

			case FIELD_TYPES.DATE_FIELD:
                fieldComponent =
					<DateField label={fieldJson.label} 
						form={form} 
						additionalProps={fieldJson.additionalProps}
					    isRequired={isRequired}
					    isDisabled={isDisabled}
						fieldName={fieldJson.fieldName}
                		validations={fieldJson.validations}/>;
				break;

			case FIELD_TYPES.DROP_DOWN:
				fieldComponent =
					<SelectBox
                        form={form}
						label={fieldJson.label} 
						fieldName={fieldJson.fieldName}
						isMultiple={false}
						isRequired={isRequired}
                        isDisabled={isDisabled}
						options={this.parseOptions(fieldJson, form)}
						additionalProps={fieldJson.additionalProps}/>;
				break;
				
			case FIELD_TYPES.MULTI_SELECT:
				fieldComponent =
					<SelectBox
                        form={form}
                        isMultiple={true}
						label={fieldJson.label} 
						fieldName={fieldJson.fieldName}
						isRequired={isRequired}
                        isDisabled={isDisabled}
						options={this.parseOptions(fieldJson, form)}
						additionalProps={fieldJson.additionalProps}/>;
				break;
				
			case FIELD_TYPES.SUBMITTER_INFORMATION:
				return <SubmitterInformation 
				userInformation={userInformation} 
				form={form}
				json={fieldJson} />;
						
			case FIELD_TYPES.TEXT_FIELD:
				fieldComponent = 
					<TextField
                        form={form}
                        label={fieldJson.label}
						fieldName={fieldJson.fieldName}
						isRequired={isRequired}
						json={fieldJson}
						isFieldDisabled={this.isFieldDisabled}
						additionalProps={fieldJson.additionalProps}/>;
				break;
				
			case FIELD_TYPES.TEXT_AREA:
				fieldComponent = <TextArea
                    form={form}
                    label={fieldJson.label}
					fieldName={fieldJson.fieldName}
					isRequired={isRequired}
                    isDisabled={isDisabled}
					additionalProps={fieldJson.additionalProps}/>;
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
	isFieldDisabled = function(fieldJson, form) {
		if(fieldJson !== undefined && fieldJson.hasOwnProperty(LINKED_WITH)) {
			let {linkedWith, displayWhen} = fieldJson;
			let linkedValue = form.getFieldValue(linkedWith);
			return displayWhen !== linkedValue;
		}
		return false;
	}

	parseOptions = function(fieldJson, form) {
        let {values, otherAvailable, constrainedBy, constraints} = fieldJson;

        if(fieldJson.hasOwnProperty('constrainedBy')) {
        	let constrainedValue = form.getFieldValue(constrainedBy);
        	if(constraints.hasOwnProperty(constrainedValue)) {
                values = constraints[constrainedValue];
			}
		}

        values.sort(function(a,b){
        	return a.toLowerCase().localeCompare(b.toLowerCase());
        });
        
        values = values.map((element) => {
            return {label: element, value: element};
        });

        if(otherAvailable) {
            values.push({label: OTHER_AVAILABLE_LABEL, value: OTHER_AVAILABLE_LABEL});
        }

        return values;
	}
}