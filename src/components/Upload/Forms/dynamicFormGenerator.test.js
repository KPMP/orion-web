import React, { Component } from 'react';
import { DynamicFormGenerator } from './dynamicFormGenerator';
import { Row, Col } from 'react-bootstrap';
import Enzyme, { shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Form } from 'antd';

Enzyme.configure({adapter: new Adapter()});

describe("renderSection", () => {
	let formGenerator = new DynamicFormGenerator();
	let form = jest.fn();
	
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
	let formGenerator = new DynamicFormGenerator();
	let form = {
		isFieldTouched: jest.fn(),
		getFieldDecorator: jest.fn(opts => c => c)
	}
	
	it('should handle a Text Field', () => {
		let fieldJson = 
		{
			"label": "More stuff",
			"type": "Text Field",
			"required": true,
			"fieldName": "moreStuff"
		};
		let field = render(formGenerator.renderField(fieldJson, form));
		expect(field.find('label').text()).toBe('More stuff');
		expect(field.find('input[name="moreStuff"][type="text"]').length).toBe(1);
	});
	
	it('should handle a Drop-down', () => {
		let fieldJson = 
		{
			"label": "More stuff",
			"type": "Drop-down",
			"required": true,
			"fieldName": "moreStuff",
			"values": [ '1', '2']
		};
		let field = render(formGenerator.renderField(fieldJson, form));
		expect(field.find('label').text()).toBe('More stuff');
		expect(field.find('input').length).toBe(1);
	});
	
	it('should handle a Multi-select', () => {
		let fieldJson = 
		{
			"label": "More stuff",
			"type": "Multi-select",
			"required": true,
			"fieldName": "moreStuff",
			"values": [ '1', '2']
		};
		let field = render(formGenerator.renderField(fieldJson, form));
		expect(field.find('label').text()).toBe('More stuff');
		expect(field.find('input').length).toBe(1);
	});
	
	it('should handle a Text Area', () => {
		let fieldJson = 
		{
			"label": "More stuff",
			"type": "Text Area",
			"required": true,
			"fieldName": "moreStuff",
			"values": [ '1', '2']
		};
		let field = render(formGenerator.renderField(fieldJson, form));
		expect(field.find('label').text()).toBe('More stuff');
		expect(field.find('textarea[name="moreStuff"]').length).toBe(1);
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
		let field = render(formGenerator.renderField(fieldJson, form, {}));
		expect(field.find('label').text()).toBe('Submitted By');
	});
	
});

