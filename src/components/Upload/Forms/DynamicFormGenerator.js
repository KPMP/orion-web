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

const LINKED_WITH = 'linkedWith';
const COLUMNS = 'cols';
const ADDITIONAL_PROPS = 'additionalProps';

export class DynamicFormGenerator {
	
	renderSection = (inputSectionJson, form, userInformation) => {
    console.log(inputSectionJson)
    console.log(form)

		let sectionJson = Object.assign({}, inputSectionJson);

		return (
			<section key={sectionJson.sectionHeader}>
				<h5>{sectionJson.sectionHeader}</h5>
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
		if (fieldJson.hasOwnProperty(ADDITIONAL_PROPS) && fieldJson.additionalProps.hasOwnProperty(COLUMNS)) {
			({ colLg, colMd, colSm } = fieldJson.additionalProps.cols);
		}
		let isDisabled = this.isFieldDisabled(fieldJson, form);
		let isRequired = !isDisabled && fieldJson.required;

		switch (fieldJson.type.toUpperCase()) {

			case FIELD_TYPES.NUMERIC:
                fieldComponent =
                    <NumericField label={fieldJson.label}
                		key={fieldJson.label}
                		form={form}
                		additionalProps={fieldJson.additionalProps}
                		isRequired={isRequired}
                		json={fieldJson}
        				isFieldDisabled={this.isFieldDisabled}
                		fieldName={fieldJson.fieldName}/>;
				break;

			case FIELD_TYPES.DATE_FIELD:
                fieldComponent =
					<DateField label={fieldJson.label} 
                		key={fieldJson.label}
						form={form} 
						additionalProps={fieldJson.additionalProps}
					    isRequired={isRequired}
					    json={fieldJson}
                		isFieldDisabled={this.isFieldDisabled}
						fieldName={fieldJson.fieldName}
                		validations={fieldJson.validations}/>;
				break;

			case FIELD_TYPES.DROP_DOWN:
				fieldComponent =
					<SelectBox
						key={fieldJson.label}
                        form={form}
						label={fieldJson.label} 
						fieldName={fieldJson.fieldName}
						isMultiple={false}
						isRequired={isRequired}
						json={fieldJson}
        				isFieldDisabled={this.isFieldDisabled}
						options={this.parseOptions(fieldJson, form)}
						additionalProps={fieldJson.additionalProps}/>;
				break;
				
			case FIELD_TYPES.MULTI_SELECT:
				fieldComponent =
					<SelectBox
						key={fieldJson.label}
                        form={form}
                        isMultiple={true}
						label={fieldJson.label} 
						fieldName={fieldJson.fieldName}
						isRequired={isRequired}
						json={fieldJson}
        				isFieldDisabled={this.isFieldDisabled}
						options={this.parseOptions(fieldJson, form)}
						additionalProps={fieldJson.additionalProps}/>;
				break;
				
			case FIELD_TYPES.SUBMITTER_INFORMATION:
				return <SubmitterInformation key="submitterInformation"
				userInformation={userInformation} 
				form={form} />;
						
			case FIELD_TYPES.TEXT_FIELD:
				fieldComponent = 
					<TextField
						key={fieldJson.label}
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
					key={fieldJson.label}
                    form={form}
                    label={fieldJson.label}
					fieldName={fieldJson.fieldName}
					isRequired={isRequired}
					json={fieldJson}
					isFieldDisabled={this.isFieldDisabled}
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
			<Col lg={colLg} md={colMd} sm={colSm} key={fieldJson.label}>
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
        let {values, constrainedBy, constraints} = fieldJson;

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

        return values;
	}
}