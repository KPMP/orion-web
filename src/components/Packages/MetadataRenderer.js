import React, { Component } from 'react';
import { Input, Tree } from 'antd';
import dateFormat from 'dateformat';
import { getIEFriendlyDate } from '../../helpers/timezoneUtil';
import { faEdit, faSquareXmark, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { TreeNode } = Tree;

class MetadataRenderer extends Component{
    constructor(props) {
        super(props);
        console.log("MetadataRenderer Constructor");
        console.log(this.props)
        this.state = {
            checkClicked: false,
            xClicked: false,
            editBiopsyId: false,
            editStudyId: false,
        }
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleCheckClick = this.handleCheckClick.bind(this);
        this.handleDismiss = this.handleDismiss.bind(this);
        this.renderField = this.renderField.bind(this);
        this.renderSection = this.renderSection.bind(this);
    }

    handleDismiss() {
        return null;
    }

    handleCheckClick() {
        this.setState({checkClicked: true})
        alert("You Clicked the check icon!");
        return null;
    }   

    handleEditClick(identifier) {
        if (identifier === "Biopsy ID") {
            this.setState({editBiopsyId: true})
        } else if (identifier === "Study ID") {
            this.setState({editStudyId: true})
        }
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
            if (this.props.userInformation.userInformation?.roles.includes("uploader_admin") || this.props.userInformation?.email === packageInfo.submitter.email) {
                return <TreeNode title={
                    <span>
                        {
                            this.state.editBiopsyId ? 
                            <span>
                                Biopsy ID: <Input placeholder ={"Edit BiopsyID"}/> 
                                <FontAwesomeIcon icon={faSquareCheck} className="text-success clickable" onClick={this.handleCheckClick}/> 
                                <FontAwesomeIcon icon={faSquareXmark} className="text-danger clickable" onClick={this.handleDismiss}/>
                            </span>
                            :
                            <span>
                                Biopsy ID: {packageInfo.biopsyId} {" "}
                                <FontAwesomeIcon className='text-primary clickable' icon={faEdit} onClick={this.handleEditClick("Biopsy ID")}/>
                            </span>     
                        }
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
            if (this.props.userInformation.userInformation?.roles.includes("uploader_admin") || this.props.userInformation?.email === packageInfo.submitter.email) {
                return <TreeNode title={
                    <span>
                        {
                            this.state.editStudyId ? 
                            <span>
                                Study ID: <Input placeholder ={"Edit Study ID"}/> 
                                <FontAwesomeIcon icon={faSquareCheck} className="text-success clickable" onClick={this.handleCheckClick}/> 
                                <FontAwesomeIcon icon={faSquareXmark} className="text-danger clickable" onClick={this.handleDismiss}/>
                            </span>
                            : 
                            <span>
                                Study ID: {packageInfo.studyId} {" "}
                                <FontAwesomeIcon className='text-primary clickable' icon={faEdit} onClick={this.handleEditClick("Study ID")}/>
                            </span>
                        }
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
    render() {
            console.log("MetedataRenderer render");
            let dtd = this.props.dtd[this.props.uploadPackage.version];
            console.log(dtd)
            let standardSection = this.renderSection(dtd.standardFields, this.props.uploadPackage);
            let remainingSections = "";
            let packageType = this.props.uploadPackage.packageType;
            if (packageType !== undefined) {
                remainingSections = dtd.typeSpecificElements.filter(function (element) {
                    return element.hasOwnProperty(packageType)
                });
                if (remainingSections.length > 0) {
                    remainingSections = remainingSections[0][packageType];
                    remainingSections = remainingSections.sections.map((section) => {
                        return this.renderSection(section, this.props.uploadPackage);
                    });
                }
            }
            return (
                <Tree blockNode={true} defaultExpandedKeys={[this.props.defaultExpandedKeys]}>
                    {standardSection}
                    {remainingSections}
                </Tree>
            )
    }
	
}

export default MetadataRenderer;