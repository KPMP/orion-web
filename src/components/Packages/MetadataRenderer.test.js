import React from 'react';
import { MetadataRenderer } from './MetadataRenderer';
import { Tree } from 'antd';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

const { TreeNode } = Tree;

describe('renderSection', () => {
	const renderer = new MetadataRenderer();
	
	beforeEach(() => {
		renderer.renderField = jest.fn();
	});
	
	it('should call render field for each field defined in the section', () => {
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
		let packageInfo = {};
		let section = renderer.renderSection(sectionJson.standardFields, packageInfo);
		expect(renderer.renderField).toHaveBeenCalledTimes(2);
	});
	
	it('should contain a top-level TreeNode', () => {
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
			let packageInfo = { tisInternalExperimentID: "value", moreStuff: "another value" };
			let section = renderer.renderSection(sectionJson.standardFields, packageInfo);
			let mounted = mount(<Tree>{section}</Tree>);
			expect(mounted.find(Tree).length).toBe(1);
			expect(mounted.find(TreeNode).length).toBe(1);
			let treeNode = mounted.find(TreeNode);
			let props = treeNode.props();
			expect(props.hasOwnProperty('title')).toBe(true);
			expect(props.hasOwnProperty('selectable')).toBe(true);
			expect(props.hasOwnProperty('eventKey')).toBe(true);
			expect(props.title).toEqual("Dataset Information");
			expect(props.selectable).toEqual(false);
			expect(props.eventKey).toEqual("Dataset Information");
	});
});

describe('renderField', () => {
	const renderer = new MetadataRenderer();
	
	it('should handle "Submitter Information" type correctly', () => {
		let fieldJson = 
		{
			"label": "More stuff",
			"type": "Submitter Information",
		};
		let packageInfo = { submitter: { firstName: "Testy", lastName: "Testerson" }, tisName: "Looney Bin"};
		
		let field = renderer.renderField(fieldJson, packageInfo);
		let mounted = mount(<Tree>{field}</Tree>);
		expect(mounted.find(TreeNode).length).toBe(1);
		let node = mounted.find(TreeNode);
		let props = node.props();
		expect(props.hasOwnProperty('title')).toBe(true);
		expect(props.hasOwnProperty('selectable')).toBe(true);
		expect(props.hasOwnProperty('eventKey')).toBe(true);
		expect(props.title).toEqual("Submitted by:");
		expect(props.selectable).toEqual(false);
		expect(props.eventKey).toEqual("Submitted by:");
		
		expect(props.children.length).toBe(2);
		let tisName = props.children[0];
		let submitter = props.children[1];
		let mountedInstitution = mount(<Tree>{tisName}</Tree>);
		let institutionDom = mountedInstitution.find(TreeNode	);
		props = institutionDom.props();
		expect(props.hasOwnProperty('title')).toBe(true);
		expect(props.hasOwnProperty('selectable')).toBe(true);
		expect(props.hasOwnProperty('eventKey')).toBe(true);
		expect(props.hasOwnProperty('isLeaf')).toBe(true);
		expect(props.title).toEqual("TIS Name: Looney Bin");
		expect(props.selectable).toEqual(false);
		expect(props.eventKey).toEqual("TIS Name: Looney Bin");
		expect(props.isLeaf).toEqual(true);
		
		let mountedSubmitter = mount(<Tree>{submitter}</Tree>);
		let submitterDom = mountedSubmitter.find(TreeNode	);
		props = submitterDom.props();
		expect(props.hasOwnProperty('title')).toBe(true);
		expect(props.hasOwnProperty('selectable')).toBe(true);
		expect(props.hasOwnProperty('eventKey')).toBe(true);
		expect(props.hasOwnProperty('isLeaf')).toBe(true);
		expect(props.title).toEqual("Submitter: Testy Testerson");
		expect(props.selectable).toEqual(false);
		expect(props.eventKey).toEqual("Submitter: Testy Testerson");
		expect(props.isLeaf).toEqual(true);

	});
	
	it('should render remaining fields appropriately', () => {
		let fieldJson = 
		{
			"label": "More stuff",
			"type": "Something else",
			"fieldName": "thisField"
		};
		let packageInfo = { thisField: "This value" };
		let field = renderer.renderField(fieldJson, packageInfo);
		let mounted = mount(<Tree>{field}</Tree>);
		expect(mounted.find(TreeNode).length).toBe(1);
		expect(mounted.find(TreeNode).length).toBe(1);
		let node = mounted.find(TreeNode);
		let props = node.props();
		expect(props.hasOwnProperty('title')).toBe(true);
		expect(props.hasOwnProperty('selectable')).toBe(true);
		expect(props.hasOwnProperty('eventKey')).toBe(true);
		expect(props.hasOwnProperty('isLeaf')).toBe(true);
		expect(props.title).toEqual("More stuff: This value");
		expect(props.selectable).toEqual(false);
		expect(props.eventKey).toEqual("More stuff: This value");
		expect(props.isLeaf).toBe(true);
	});
	
	it('should render field with blank value when not in packageInfo', () => {
		let fieldJson = 
		{
				"label": "More stuff",
				"type": "Something else",
				"fieldName": "thisField"
		};
		let packageInfo = { anotherField: "This value" };
		let field = renderer.renderField(fieldJson, packageInfo);
		let mounted = mount(<Tree>{field}</Tree>);
		expect(mounted.find(TreeNode).length).toBe(1);
		expect(mounted.find(TreeNode).length).toBe(1);
		let node = mounted.find(TreeNode);
		let props = node.props();
		expect(props.hasOwnProperty('title')).toBe(true);
		expect(props.hasOwnProperty('selectable')).toBe(true);
		expect(props.hasOwnProperty('eventKey')).toBe(true);
		expect(props.hasOwnProperty('isLeaf')).toBe(true);
		expect(props.title).toEqual("More stuff: ");
		expect(props.selectable).toEqual(false);
		expect(props.eventKey).toEqual("More stuff: ");
		expect(props.isLeaf).toBe(true);
	});
});