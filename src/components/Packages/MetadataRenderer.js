import React from 'react';
import { Tree } from 'antd';
import dateFormat from 'dateformat';
import { getIEFriendlyDate } from '../../helpers/timezoneUtil';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { TreeNode } = Tree;

export class MetadataRenderer {
    constructor(userInformation) {
        this.userInformation = userInformation;

    }


	collapseSummarySections = (fields) => {
		let fieldsSeen = [];
		let list = [];
		fields.forEach((field) => {
			if (!fieldsSeen.includes(field.summarize.label)) {
				fieldsSeen.push(field.summarize.label);
				list.push(field);
			}
		});
		return list;
	}
	
	renderSection = (section, metadata) => {
		let header = section.sectionHeader;
		let fields = section.fields;
		let summaryFields = fields.filter(function(field){
			return field.summarize !== undefined;
		});
		let summarySections = this.collapseSummarySections(summaryFields);
		return (
			<TreeNode title={header} key={header} selectable={false}>
				{ fields.map((fieldJson) => this.renderField(fieldJson, metadata)) }
				{ summarySections.map((fieldJson) => this.renderSummaryFields(fieldJson, metadata))}
			</TreeNode>
		);

	}

	renderSummaryFields = (fieldJson, packageInfo) => {
		let fieldLabel = fieldJson.summarize.label;
		let value = packageInfo[fieldJson.summarize.field];
		let summaryField = fieldLabel + ": " + value;
		return <TreeNode title={summaryField} key={summaryField} isLeaf selectable={false}/>
}
	
	renderField = (fieldJson, packageInfo) => {
        console.log(this.userInformation);
        console.log(this.userInformation.userInformation);
        console.log(fieldJson)
		if (fieldJson.type === "Submitter Information") {
			let name= packageInfo.submitter.firstName + " " + packageInfo.submitter.lastName;
			let nameField = "Submitter: " + name;
			return (
				<TreeNode title={nameField} key={nameField} isLeaf selectable={false}/>
			);
		} else if (fieldJson.summarize !== undefined) {
				return "";
		}
        else if (fieldJson.fieldName === "biopsyId"){
            if (this.userInformation.userInformation?.roles.includes("uploader_admin") || this.userInformation?.email === packageInfo.submitter.email) {
                console.log("rendering editable biopsy id");
                return <TreeNode title={"Biopsy ID: " + packageInfo.biopsyId + <FontAwesomeIcon className="text-primary clickable" icon={faEdit}/>} key={packageInfo.biopsyId} isLeaf selectable={false}/>;
            }else{
                let titleText = fieldJson.label +": " + fieldValue;
			    let title = <span className='tree-title' title={titleText}>{titleText} </span>;
			    let eventKey = fieldJson.label + ": " + fieldValue;
			    return <TreeNode title={title} key={eventKey} selectable={false} isLeaf/>;
            }

        }
         else {
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