import React from 'react';
import { Tree } from 'antd';
import dateFormat from 'dateformat';
import { getIEFriendlyDate } from '../../helpers/timezoneUtil';

const { TreeNode } = Tree;

export class MetadataRenderer {
	
	renderSection = (section, metadata) => {
		let header = section.sectionHeader;
		let fields = section.fields;
		return (
			<TreeNode title={header} key={header} selectable={false}>
				{ fields.map((fieldJson) => this.renderField(fieldJson, metadata)) }
			</TreeNode>
		);
	}
	
	renderField = (fieldJson, packageInfo) => {
		if (fieldJson.type === "Submitter Information") {
			let name= packageInfo.submitter.firstName + " " + packageInfo.submitter.lastName;
			let nameField = "Submitter: " + name;
			let institutionField = "TIS Name: " + packageInfo.tisName;
			return (
				<TreeNode title="Submitted by:" key="Submitted by:" selectable={false}>
					<TreeNode title={institutionField} key={institutionField} isLeaf selectable={false}/>
					<TreeNode title={nameField} key={nameField} isLeaf selectable={false}/>
				</TreeNode>
			);
		} else {
			if (fieldJson.fieldName ==="tisName") {
				return "";
			}
			let fieldValue = packageInfo[fieldJson.fieldName] === undefined ? "" : packageInfo[fieldJson.fieldName];
			if (fieldJson.fieldName === "experimentDate") {
				let experimentDate = packageInfo[fieldJson.fieldName]?dateFormat(getIEFriendlyDate(packageInfo[fieldJson.fieldName]), 'yyyy-mm-dd', true):"N/A";
				fieldValue = packageInfo[fieldJson.fieldName] === undefined ? "" : experimentDate;
			}
			
			let titleText = fieldJson.label +": " + fieldValue;
			let title = <span className='tree-title' title={titleText}>{titleText} </span>;
			let eventKey = fieldJson.label + ": " + fieldValue;
			return <TreeNode title={title} key={eventKey} selectable={false} isLeaf/>;
		}
	}
	
}