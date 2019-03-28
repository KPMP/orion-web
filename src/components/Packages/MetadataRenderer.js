import React from 'react';
import { Tree } from 'antd';

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
			let institutionField = "Institution: " + packageInfo.institution;
			return (
				<TreeNode title="Submitted by:" key="Submitted by:" selectable={false}>
					<TreeNode title={institutionField} key={institutionField} isLeaf selectable={false}/>
					<TreeNode title={nameField} key={nameField} isLeaf selectable={false}/>
				</TreeNode>
			);
		} else {
			let fieldValue = packageInfo[fieldJson.fieldName] === undefined ? "" : packageInfo[fieldJson.fieldName];
			let title = fieldJson.label + ": " + fieldValue;
			return <TreeNode title={title} key={title} selectable={false} isLeaf/>;
		}
	}
	
}