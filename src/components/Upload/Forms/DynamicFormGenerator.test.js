import React from 'react';
import { DynamicFormGenerator } from './DynamicFormGenerator';
import { Row } from 'reactstrap';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextArea from './FormComponents/TextArea';
import TextField from './FormComponents/TextField';
import SelectBox from './FormComponents/SelectBox';
import NumericField from './FormComponents/NumericField';
import DateField from './FormComponents/DateField';
import SubmitterInformation from './FormComponents/SubmitterInformation';

Enzyme.configure({adapter: new Adapter()});

describe("renderSection", () => {
	const formGenerator = new DynamicFormGenerator();
	const form = jest.fn();
	
	beforeEach(() => {
		formGenerator.renderField = jest.fn();
	});
	
	it('should call renderField for each field defined in the section', () => {
		let sectionJson = {
			"standardFields": {
				"sectionHeader": "Dataset Information",
				"fields": [
					{
						"label": "TIS Internal Experiment ID",
						"type": "Text Field",
						"required": true,
						"fieldName": "tisInternalExperimentID"
					},
					{
						"label": "More stuff",
						"type": "Text Field",
						"required": true,
						"fieldName": "moreStuff"
					}
				]
			}
		};
		let userInformation = {};
		let section = shallow(formGenerator.renderSection(sectionJson.standardFields, form, userInformation));
		expect(section.find('section').length).toBe(1);
		expect(section.find(Row).length).toBe(1);
		expect(formGenerator.renderField).toHaveBeenCalledTimes(2);
	});
	
	it('should not call renderField for when no fields in a section', () => {
		let sectionJson = {
			"standardFields": {
				"sectionHeader": "Dataset Information",
				"fields": []
			}
		};
		let userInformation = {};
		let section = shallow(formGenerator.renderSection(sectionJson.standardFields, form, userInformation));
		expect(section.find('section').length).toBe(1);
		expect(section.find(Row).length).toBe(1);
		expect(formGenerator.renderField).toHaveBeenCalledTimes(0);
	});
	
	it ('should create a <section> with the header from the json', () => {
		let sectionJson = {
			"standardFields": {
				"sectionHeader": "Dataset Information",
				"fields": []
			}
		};
		let userInformation = {};
		let section = shallow(formGenerator.renderSection(sectionJson.standardFields, form, userInformation));
		expect(section.find('h2').text()).toBe("Dataset Information");
	});
});

describe('renderField', () => {
	const formGenerator = new DynamicFormGenerator();

	let form = {
		isFieldTouched: jest.fn(),
		getFieldDecorator: jest.fn(opts => c => c),
		getFieldValue: jest.fn()
	}
	
	it('should handle a required Text Field', () => {
		let fieldJson = 
		{
			"label": "More stuff",
			"type": "Text Field",
			"required": true,
			"fieldName": "moreStuff",
			"additionalProps": {"field": "value"}
		};
		let mounted = mount(formGenerator.renderField(fieldJson, form));
		expect(mounted.find(TextField).length).toBe(1);
		let properties = mounted.find(TextField).props();
		expect(properties.hasOwnProperty('label')).toBe(true);
		expect(properties.hasOwnProperty('fieldName')).toBe(true);
		expect(properties.hasOwnProperty('form')).toBe(true);
		expect(properties.hasOwnProperty('isRequired')).toBe(true);
		expect(properties.hasOwnProperty('isDisabled')).toBe(true);
		expect(properties.hasOwnProperty('additionalProps')).toBe(true);
		expect(properties.label).toEqual('More stuff');
		expect(properties.fieldName).toEqual('moreStuff');
		expect(properties.form).toEqual(form);
		expect(properties.isRequired).toEqual(true);
		expect(properties.isDisabled).toEqual(false);
		expect(properties.additionalProps).toEqual({"field": "value"});
	});
	
	it('should handle an optional Text Field', () => {
		let fieldJson = 
		{
				"label": "More stuff",
				"type": "Text Field",
				"required": false,
				"fieldName": "moreStuff",
				"additionalProps": {"field": "value"}
		};
		let mounted = mount(formGenerator.renderField(fieldJson, form));
		expect(mounted.find(TextField).length).toBe(1);
		let properties = mounted.find(TextField).props();
		expect(properties.hasOwnProperty('label')).toBe(true);
		expect(properties.hasOwnProperty('fieldName')).toBe(true);
		expect(properties.hasOwnProperty('form')).toBe(true);
		expect(properties.hasOwnProperty('isRequired')).toBe(true);
		expect(properties.hasOwnProperty('isDisabled')).toBe(true);
		expect(properties.hasOwnProperty('additionalProps')).toBe(true);
		expect(properties.label).toEqual('More stuff');
		expect(properties.fieldName).toEqual('moreStuff');
		expect(properties.form).toEqual(form);
		expect(properties.isRequired).toEqual(false);
		expect(properties.isDisabled).toEqual(false);
		expect(properties.additionalProps).toEqual({"field": "value"});
	});
	
	it('should handle a required Drop-down', () => {
		let fieldJson = 
		{
			"label": "More stuff",
			"type": "Drop-down",
			"required": true,
			"fieldName": "moreStuff",
			"values": [ '1', '2'],
			"additionalProps": {"field": "value"}
		};
		
		let options = fieldJson.values.map((element) => {
			return {label: element, value: element};
		});
		
		let mounted = mount(formGenerator.renderField(fieldJson, form));
		expect(mounted.find(SelectBox).length).toBe(1);
		let properties = mounted.find(SelectBox).props();
		expect(properties.hasOwnProperty('label')).toBe(true);
		expect(properties.hasOwnProperty('fieldName')).toBe(true);
		expect(properties.hasOwnProperty('options')).toBe(true);
		expect(properties.hasOwnProperty('form')).toBe(true);
		expect(properties.hasOwnProperty('isRequired')).toBe(true);
		expect(properties.hasOwnProperty('isMultiple')).toBe(true);
		expect(properties.hasOwnProperty('isDisabled')).toBe(true);
		expect(properties.hasOwnProperty('additionalProps')).toBe(true);
		expect(properties.label).toEqual('More stuff');
		expect(properties.fieldName).toEqual("moreStuff");
		expect(properties.form).toEqual(form);
		expect(properties.options).toEqual(options);
		expect(properties.isRequired).toEqual(true);
		expect(properties.isMultiple).toEqual(false);
		expect(properties.isDisabled).toEqual(false);
		expect(properties.additionalProps).toEqual({"field": "value"});
	});
	
	it('should handle an optional Drop-down', () => {
		let fieldJson = 
		{
				"label": "More stuff",
				"type": "Drop-down",
				"required": false,
				"fieldName": "moreStuff",
				"values": [ '1', '2'],
				"additionalProps": {"field": "value"}
		};
		
		let options = fieldJson.values.map((element) => {
			return {label: element, value: element};
		});
		
		let mounted = mount(formGenerator.renderField(fieldJson, form));
		expect(mounted.find(SelectBox).length).toBe(1);
		let properties = mounted.find(SelectBox).props();
		expect(properties.hasOwnProperty('label')).toBe(true);
		expect(properties.hasOwnProperty('fieldName')).toBe(true);
		expect(properties.hasOwnProperty('options')).toBe(true);
		expect(properties.hasOwnProperty('form')).toBe(true);
		expect(properties.hasOwnProperty('isRequired')).toBe(true);
		expect(properties.hasOwnProperty('isMultiple')).toBe(true);
		expect(properties.hasOwnProperty('isDisabled')).toBe(true);
		expect(properties.hasOwnProperty('additionalProps')).toBe(true);
		expect(properties.label).toEqual('More stuff');
		expect(properties.fieldName).toEqual("moreStuff");
		expect(properties.form).toEqual(form);
		expect(properties.options).toEqual(options);
		expect(properties.isRequired).toEqual(false);
		expect(properties.isMultiple).toEqual(false);
		expect(properties.isDisabled).toEqual(false);
		expect(properties.additionalProps).toEqual({"field": "value"});
	});
	
	it('should handle a required Multi-select', () => {
		let fieldJson = 
		{
			"label": "More stuff",
			"type": "Multi-select",
			"required": true,
			"fieldName": "moreStuff",
			"values": [ '1', '2'],
			"additionalProps": {"field": "value"}
		};
		let options = fieldJson.values.map((element) => {
			return {label: element, value: element};
		});
		
		let mounted = mount(formGenerator.renderField(fieldJson, form));
		expect(mounted.find(SelectBox).length).toBe(1);
		let properties = mounted.find(SelectBox).props();
		expect(properties.hasOwnProperty('label')).toBe(true);
		expect(properties.hasOwnProperty('fieldName')).toBe(true);
		expect(properties.hasOwnProperty('form')).toBe(true);
		expect(properties.hasOwnProperty('options')).toBe(true);
		expect(properties.hasOwnProperty('isRequired')).toBe(true);
		expect(properties.hasOwnProperty('isMultiple')).toBe(true);
		expect(properties.hasOwnProperty('additionalProps')).toBe(true);
		expect(properties.label).toEqual("More stuff");
		expect(properties.fieldName).toEqual('moreStuff');
		expect(properties.form).toEqual(form);
		expect(properties.options).toEqual(options);
		expect(properties.isRequired).toEqual(true);
		expect(properties.isMultiple).toEqual(true);
		expect(properties.additionalProps).toEqual({"field": "value"});
	});
	
	it('should handle an optional Multi-select', () => {
		let fieldJson = 
		{
				"label": "More stuff",
				"type": "Multi-select",
				"required": false,
				"fieldName": "moreStuff",
				"values": [ '1', '2'],
				"additionalProps": {"field": "value"}
		};
		let options = fieldJson.values.map((element) => {
			return {label: element, value: element};
		});
		
		let mounted = mount(formGenerator.renderField(fieldJson, form));
		expect(mounted.find(SelectBox).length).toBe(1);
		let properties = mounted.find(SelectBox).props();
		expect(properties.hasOwnProperty('label')).toBe(true);
		expect(properties.hasOwnProperty('fieldName')).toBe(true);
		expect(properties.hasOwnProperty('form')).toBe(true);
		expect(properties.hasOwnProperty('options')).toBe(true);
		expect(properties.hasOwnProperty('isRequired')).toBe(true);
		expect(properties.hasOwnProperty('isMultiple')).toBe(true);
		expect(properties.hasOwnProperty('additionalProps')).toBe(true);
		expect(properties.label).toEqual("More stuff");
		expect(properties.fieldName).toEqual('moreStuff');
		expect(properties.form).toEqual(form);
		expect(properties.options).toEqual(options);
		expect(properties.isRequired).toEqual(false);
		expect(properties.isMultiple).toEqual(true);
		expect(properties.additionalProps).toEqual({"field": "value"});
	});
	
	it('should handle a required Text Area', () => {
		let fieldJson = 
		{
			"label": "More stuff",
			"type": "Text Area",
			"required": true,
			"fieldName": "moreStuff",
			"additionalProps": {"field": "value"}
		};
		let mounted = mount(formGenerator.renderField(fieldJson, form));
		expect(mounted.find(TextArea).length).toBe(1);
		let properties = mounted.find(TextArea).props();
		expect(properties.hasOwnProperty('label')).toBe(true);
		expect(properties.hasOwnProperty('fieldName')).toBe(true);
		expect(properties.hasOwnProperty('form')).toBe(true);
		expect(properties.hasOwnProperty('isRequired')).toBe(true);
		expect(properties.hasOwnProperty('isDisabled')).toBe(true);
		expect(properties.hasOwnProperty('additionalProps')).toBe(true);
		expect(properties.label).toEqual('More stuff');
		expect(properties.fieldName).toEqual('moreStuff');
		expect(properties.form).toEqual(form);
		expect(properties.isRequired).toEqual(true);
		expect(properties.isDisabled).toEqual(false);
		expect(properties.additionalProps).toEqual({"field": "value"});
	});
	
	it('should handle an optional Text Area', () => {
		let fieldJson = 
		{
				"label": "More stuff",
				"type": "Text Area",
				"required": false,
				"fieldName": "moreStuff",
				"additionalProps": {"field": "value"}
		};
		let mounted = mount(formGenerator.renderField(fieldJson, form));
		expect(mounted.find(TextArea).length).toBe(1);
		let properties = mounted.find(TextArea).props();
		expect(properties.hasOwnProperty('label')).toBe(true);
		expect(properties.hasOwnProperty('fieldName')).toBe(true);
		expect(properties.hasOwnProperty('form')).toBe(true);
		expect(properties.hasOwnProperty('isRequired')).toBe(true);
		expect(properties.hasOwnProperty('isDisabled')).toBe(true);
		expect(properties.hasOwnProperty('additionalProps')).toBe(true);
		expect(properties.label).toEqual('More stuff');
		expect(properties.fieldName).toEqual('moreStuff');
		expect(properties.form).toEqual(form);
		expect(properties.isRequired).toEqual(false);
		expect(properties.isDisabled).toEqual(false);
		expect(properties.additionalProps).toEqual({"field": "value"});
	});
	
	it('should handle a required Numeric', () => {
		let fieldJson = 
		{
				"label": "More stuff",
				"type": "Numeric",
				"required": true,
				"fieldName": "moreStuff",
				"additionalProps": { "field": "value" }
		};
		let mounted = mount(formGenerator.renderField(fieldJson, form));
		expect(mounted.find(NumericField).length).toBe(1);
		let properties = mounted.find(NumericField).props();
		expect(properties.hasOwnProperty('label')).toBe(true);
		expect(properties.hasOwnProperty('fieldName')).toBe(true);
		expect(properties.hasOwnProperty('form')).toBe(true);
		expect(properties.hasOwnProperty('isRequired')).toBe(true);
		expect(properties.hasOwnProperty('isDisabled')).toBe(true);
		expect(properties.hasOwnProperty('additionalProps')).toBe(true);
		expect(properties.label).toEqual('More stuff');
		expect(properties.fieldName).toEqual('moreStuff');
		expect(properties.form).toEqual(form);
		expect(properties.isRequired).toEqual(true);
		expect(properties.isDisabled).toEqual(false);
		expect(properties.additionalProps).toEqual({ "field": "value" });
	});
	
	it('should handle an optional Numeric', () => {
		let fieldJson = 
		{
				"label": "More stuff",
				"type": "Numeric",
				"required": false,
				"fieldName": "moreStuff",
				"additionalProps": { "field": "value" }
		};
		let mounted = mount(formGenerator.renderField(fieldJson, form));
		expect(mounted.find(NumericField).length).toBe(1);
		let properties = mounted.find(NumericField).props();
		expect(properties.hasOwnProperty('label')).toBe(true);
		expect(properties.hasOwnProperty('fieldName')).toBe(true);
		expect(properties.hasOwnProperty('form')).toBe(true);
		expect(properties.hasOwnProperty('isRequired')).toBe(true);
		expect(properties.hasOwnProperty('isDisabled')).toBe(true);
		expect(properties.hasOwnProperty('additionalProps')).toBe(true);
		expect(properties.label).toEqual('More stuff');
		expect(properties.fieldName).toEqual('moreStuff');
		expect(properties.form).toEqual(form);
		expect(properties.isRequired).toEqual(false);
		expect(properties.isDisabled).toEqual(false);
		expect(properties.additionalProps).toEqual({ "field": "value" });
	});
	
	it('should handle a required DateField', () => {
		let fieldJson = 
		{
				"label": "More stuff",
				"type": "Date",
				"required": true,
				"fieldName": "moreStuff",
				"additionalProps": { "field": "value" }
		};
		let mounted = mount(formGenerator.renderField(fieldJson, form));
		expect(mounted.find(DateField).length).toBe(1);
		let properties = mounted.find(DateField).props();
		expect(properties.hasOwnProperty('label')).toBe(true);
		expect(properties.hasOwnProperty('fieldName')).toBe(true);
		expect(properties.hasOwnProperty('form')).toBe(true);
		expect(properties.hasOwnProperty('isRequired')).toBe(true);
		expect(properties.hasOwnProperty('isDisabled')).toBe(true);
		expect(properties.hasOwnProperty('additionalProps')).toBe(true);
		expect(properties.label).toEqual('More stuff');
		expect(properties.fieldName).toEqual('moreStuff');
		expect(properties.form).toEqual(form);
		expect(properties.isRequired).toEqual(true);
		expect(properties.isDisabled).toEqual(false);
		expect(properties.additionalProps).toEqual({ "field": "value" });
	});
	
	it('should handle an optional DateField', () => {
		let fieldJson = 
		{
				"label": "More stuff",
				"type": "Date",
				"required": false,
				"fieldName": "moreStuff",
				"additionalProps": { "field": "value" }
		};
		let mounted = mount(formGenerator.renderField(fieldJson, form));
		expect(mounted.find(DateField).length).toBe(1);
		let properties = mounted.find(DateField).props();
		expect(properties.hasOwnProperty('label')).toBe(true);
		expect(properties.hasOwnProperty('fieldName')).toBe(true);
		expect(properties.hasOwnProperty('form')).toBe(true);
		expect(properties.hasOwnProperty('isRequired')).toBe(true);
		expect(properties.hasOwnProperty('isDisabled')).toBe(true);
		expect(properties.hasOwnProperty('additionalProps')).toBe(true);
		expect(properties.label).toEqual('More stuff');
		expect(properties.fieldName).toEqual('moreStuff');
		expect(properties.form).toEqual(form);
		expect(properties.isRequired).toEqual(false);
		expect(properties.isDisabled).toEqual(false);
		expect(properties.additionalProps).toEqual({ "field": "value" });
	});
	
	it('should hanlde Submitter Information', () => {
		let fieldJson = 
		{
			"label": "More stuff",
			"type": "Submitter Information",
		};
		let submitterInformation = {
			firstName: "bob",
			lastName: "sponge",
			email: "sponge@bikinibottom.com"
		}
		let field = render(formGenerator.renderField(fieldJson, form, submitterInformation));
		expect(field.find('label').text()).toBe('Submitted By');
		let mounted = mount(formGenerator.renderField(fieldJson, form, submitterInformation));
		expect(mounted.find(SubmitterInformation).length).toBe(1);
		let properties = mounted.find(SubmitterInformation).props();
		expect(properties.hasOwnProperty('userInformation'));
		expect(properties.hasOwnProperty('form'));
		expect(properties.userInformation).toEqual(submitterInformation);
		expect(properties.form).toEqual(form);
		
	});
	
});


describe('isFieldDisabled', () => {
	
	const formGenerator = new DynamicFormGenerator();
	let form = {
		isFieldTouched: jest.fn(),
		getFieldDecorator: jest.fn(opts => c => c),
		getFieldValue: jest.fn()
	}
	
	it('should return false when no linkedWith value', () => {
		let fieldJson = {
			"label": "my field",
			"type": "Date"
		}
		
		expect(formGenerator.isFieldDisabled(fieldJson, form)).toEqual(false);
	});
	
	it('should be disabled when displayWhenValue not equal to field value', () => {
		let fieldJson = {
			"label": "my field",
			"type": "Date",
			"displayWhen": "special value",
			"linkedWith": "anotherField"
		};
		form.getFieldValue = jest.fn(() => "not the value");
		expect(formGenerator.isFieldDisabled(fieldJson, form)).toEqual(true);
	});
	
	it('should be enabled when displayWhenValue equal to field value', () => {
		let fieldJson = {
			"label": "my field",
			"type": "Date",
			"displayWhen": "special value",
			"linkedWith": "anotherField"
		};
		form.getFieldValue = jest.fn(() => "special value");
		expect(formGenerator.isFieldDisabled(fieldJson, form)).toEqual(false);
	});
});

describe("parseOptions", () => {
	const formGenerator = new DynamicFormGenerator();
	let form = {
		isFieldTouched: jest.fn(),
		getFieldDecorator: jest.fn(opts => c => c),
		getFieldValue: jest.fn()
	}
	
	it('should take values and create an options object in a sorted order when no constraints and no otherAvailable', () => {
		let fieldJson = {
			"label": "my field",
			"type": "Drop-down",
			"values": [ 'random order', 'list', '123', 'Zebra', 'aLPACA']
		};
		let expectedOptions = [
			{ "label": "123", "value": "123" },
			{ "label": "aLPACA", "value": "aLPACA" },
			{ "label": "list", "value": "list" },
			{ "label": "random order", "value": "random order" },
			{ "label": "Zebra", "value": "Zebra" }
		]
		let options = formGenerator.parseOptions(fieldJson, form);
		expect(options).toEqual(expectedOptions);
	});
	
	it('should add Other on the end of the options when otherAvailable is true', () => {
		let fieldJson = {
			"label": "my field",
			"type": "Drop-down",
			"values": [ 'random order', 'list', '123', 'Zebra', 'aLPACA'],
			"otherAvailable": true
		};
		let expectedOptions = [
			{ "label": "123", "value": "123" },
			{ "label": "aLPACA", "value": "aLPACA" },
			{ "label": "list", "value": "list" },
			{ "label": "random order", "value": "random order" },
			{ "label": "Zebra", "value": "Zebra" },
			{ "label": "Other", "value": "Other" }
		];
		let options = formGenerator.parseOptions(fieldJson, form);
		expect(options).toEqual(expectedOptions);
	});
	
	it('should constrain the list when constrainedBy present and value in constraints', () => {
		let fieldJson = {
			"label": "my field",
			"type": "Drop-down",
			"values": [ "item1", "item2", "item3", "item4"],
			"otherAvailable": false,
			"constrainedBy": "packageType",
			"constraints": {
				"selected value": ["item1", "item2"],
				"another value": ["item3", "item4"]
			}
		};
		let expectedOptions = [
			{ "label": "item1", "value": "item1" },
			{ "label": "item2", "value": "item2" }
		];
		form.getFieldValue = jest.fn(() => "selected value");
		expect(formGenerator.parseOptions(fieldJson, form)).toEqual(expectedOptions);
	});
	
	it('should return the values when constrainedBy present and value not in constraints', () => {
		let fieldJson = {
			"label": "my field",
			"type": "Drop-down",
			"values": [ "item1", "item2", "item3", "item4"],
			"otherAvailable": false,
			"constrainedBy": "packageType",
			"constraints": {
				"selected value": ["item1", "item2"],
				"another value": ["item3", "item4"]
			}
		};
		let expectedOptions = [
			{ "label": "item1", "value": "item1" },
			{ "label": "item2", "value": "item2" },
			{ "label": "item3", "value": "item3" },
			{ "label": "item4", "value": "item4" }
		];
		form.getFieldValue = jest.fn(() => "something else");
		expect(formGenerator.parseOptions(fieldJson, form)).toEqual(expectedOptions);
	});
});
