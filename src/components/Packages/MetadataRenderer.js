import React from 'react';
import { Input, Tree } from 'antd';
import dateFormat from 'dateformat';
import { getIEFriendlyDate } from '../../helpers/timezoneUtil';
import { faEdit, faSquareXmark, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { TreeNode } = Tree;

export class MetadataRenderer {
    constructor(userInformation) {
        this.state = {
            checkClicked: false,
            xClicked: false,
            editBiopsyId: false,
            editStudyId: false,
        }
        this.userInformation = userInformation;
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleCheckClick = this.handleCheckClick.bind(this);
    }

    handleDismiss() {
        return null;
    }

    handleCheckClick() {
        alert("You Clicked the check icon!");
        return null;
    }   

    handleEditClick(identifier) {
        return (
            <div>
                <Input placeholder ={"Edit " + identifier}/> 
                <FontAwesomeIcon icon={faSquareCheck} className="text-success clickable" onClick={this.handleCheckClick}/> 
                <FontAwesomeIcon icon={faSquareXmark} className="text-danger clickable" onClick={this.handleDismiss}/>
            </div>
        )
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
                return <TreeNode title={
                    <span>
                        Biopsy ID: 
                        {
                            this.state.editBiopsyId ? packageInfo.biopsyId : 
                            <div>
                                <Input placeholder ={"Edit BiopsyID"}/> 
                                <FontAwesomeIcon icon={faSquareCheck} className="text-success clickable" onClick={this.handleCheckClick}/> 
                                <FontAwesomeIcon icon={faSquareXmark} className="text-danger clickable" onClick={this.handleDismiss}/>
                            </div>
                        }
                        {packageInfo.studyId} {" "}
                        <FontAwesomeIcon className='text-primary clickable' icon={faEdit} onClick={this.handleEditClick("Study ID")}/>
                    </span>
                    }
                        key={packageInfo.biopsyId}
                        isLeaf
                        selectable={false}
                    />
            }else{
                let titleText = fieldJson.label +": " + fieldValue;
			    let title = <span className='tree-title' title={titleText}>{titleText} </span>;
			    let eventKey = fieldJson.label + ": " + fieldValue;
			    return <TreeNode title={title} key={eventKey} selectable={false} isLeaf/>;
            }

        }
        else if (fieldJson.fieldName === "studyId"){
            if (this.userInformation.userInformation?.roles.includes("uploader_admin") || this.userInformation?.email === packageInfo.submitter.email) {
                return <TreeNode title={
                    <span>
                        Biopsy ID: 
                        {
                            this.state.editStudyId ? packageInfo.studyId : 
                            <div>
                                <Input placeholder ={"Edit Study ID"}/> 
                                <FontAwesomeIcon icon={faSquareCheck} className="text-success clickable" onClick={this.handleCheckClick}/> 
                                <FontAwesomeIcon icon={faSquareXmark} className="text-danger clickable" onClick={this.handleDismiss}/>
                            </div>
                        }
                        {packageInfo.studyId} {" "}
                        <FontAwesomeIcon className='text-primary clickable' icon={faEdit} onClick={this.handleEditClick("Study ID")}/>
                    </span>
                    }
                        key={packageInfo.studyId}
                        isLeaf
                        selectable={false}
                    />
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