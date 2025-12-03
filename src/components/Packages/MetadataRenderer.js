import React, { Component } from 'react';
import { Input, Tree } from 'antd';
import dateFormat from 'dateformat';
import { getIEFriendlyDate } from '../../helpers/timezoneUtil';
import { faEdit, faSquareXmark, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'reactstrap';
import { editPackage } from '../../actions/Packages/packageActions';

const { TreeNode } = Tree;

class MetadataRenderer extends Component{
    constructor(props) {
        super(props);
        this.state = {
            checkClicked: false,
            xClicked: false,
            editBiopsyId: false,
            editStudyId: false,
            biopsyId: this.props.uploadPackage.biopsyId,
            studyId: this.props.uploadPackage.studyId,
        }
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleCheckClick = this.handleCheckClick.bind(this);
        this.handleDismiss = this.handleDismiss.bind(this);
        this.renderField = this.renderField.bind(this);
        this.renderSection = this.renderSection.bind(this);
    }

    handleCheckClick = async (identifier) => {
        this.setState({checkClicked: true});
        if (identifier == "biopsyId" && this.state.biopsyId?.length > 0) {
            packageEdits = {"biopsyId": this.state.biopsyId};
        }
        else if (identifier == "studyId" && this.state.studyId?.length > 0) {
            packageEdits = {"studyId": this.state.studyId};
        }
        else {
            alert("Field cannot be blank");
            return null;
        }
        let status = await editPackage(packageId, packageEdits);
        if (status == 200) {
            this.handleDismiss(identifier);
        }
        return null;
    }   

    handleDismiss = (identifier) => {
        if (identifier === "Biopsy ID") {
            this.setState({editBiopsyId: false, biopsyId: this.props.uploadPackage.biopsyId})
        } else if (identifier === "Study ID") {
            this.setState({editStudyId: false, studyId: this.props.uploadPackage.studyId})
        }
    }

    handleEditClick = (identifier) => {
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
			<TreeNode className="metadataItem" title={header} key={header} selectable={false}>
				{ fields.map((fieldJson) => this.renderField(fieldJson, metadata)) }
				{ summarySections.map((fieldJson) => this.renderSummaryFields(fieldJson, metadata))}
			</TreeNode>
		);

	}

	renderSummaryFields = (fieldJson, packageInfo) => {
		let fieldLabel = fieldJson.summarize.label;
		let value = packageInfo[fieldJson.summarize.field];
		let summaryField = fieldLabel + ": " + value;
		return <TreeNode className="metadataItem" title={summaryField} key={summaryField} isLeaf selectable={false}/>
}
	
	renderField = (fieldJson, packageInfo) => {
		if (fieldJson.type === "Submitter Information") {
			let name= packageInfo.submitter.firstName + " " + packageInfo.submitter.lastName;
			let nameField = "Submitter: " + name;
			return (
				<TreeNode className="metadataItem" title={nameField} key={nameField} isLeaf selectable={false}/>
			);
		} else if (fieldJson.summarize !== undefined) {
				return "";
		}
        else if (fieldJson.fieldName === "biopsyId"){
            if (
                this.props.userInformation?.roles.includes("uploader_admin") ||
                this.props.userInformation?.email === packageInfo.submitter.email
                ) {
                return (
                    <TreeNode
                    className="metadataItem"
                    title={
                        <div className="tree-title" style={{ display: "flex", alignItems: "center", maxWidth: "20rem" }}>
                        {this.state.editBiopsyId ? (
                            <>
                            <span>Biopsy ID:</span>
                            <Input
                                placeholder="Edit Biopsy ID" value={this.state.biopsyId}
                                style={{ marginLeft: "0.5rem", width: "10rem"}}
                            />
                            <FontAwesomeIcon
                                icon={faSquareXmark}
                                className="text-danger xMark clickable"
                                onClick={() => this.handleDismiss("Biopsy ID")}
                            />
                            <FontAwesomeIcon
                                icon={faSquareCheck}
                                className="text-success checkMark clickable"
                                onClick={() => this.handleCheckClick(packageInfo._id, "biopsyId")}
                            />
                            </>
                        ) : (
                            <>
                            <span>Biopsy ID: {packageInfo.biopsyId}</span>
                            <FontAwesomeIcon
                                className="text-primary clickable"
                                icon={faEdit}
                                style={{ marginLeft: "0.5rem" }}
                                onClick={() => this.handleEditClick("Biopsy ID")}
                            />
                            </>
                        )}
                        </div>
                    }
                    key={packageInfo.biopsyId}
                    isLeaf
                    selectable={false}
                    />
                );
                }


        }
        else if (fieldJson.fieldName === "studyId"){
            if (this.props.userInformation?.roles.includes("uploader_admin") || this.props.userInformation?.email === packageInfo.submitter.email) {
                return (
                    <TreeNode
                    className="metadataItem"
                    title={
                        <div className="tree-title" style={{ display: "flex", alignItems: "center", maxWidth: "20rem" }}>
                        {this.state.editStudyId ? (
                            <>
                            <span>Study ID:</span>
                            <Input
                                placeholder="Edit Study ID" value={this.state.studyId}
                                style={{ marginLeft: "0.5rem", width: "10rem" }}
                            />
                            <FontAwesomeIcon
                                icon={faSquareXmark}
                                className="text-danger xMark clickable"
                                onClick={() => this.handleDismiss("Study ID")}
                            />
                            <FontAwesomeIcon
                                icon={faSquareCheck}
                                className="text-success checkMark clickable"
                                onClick={() => this.handleCheckClick(packageInfo._id, "studyId")}
                            />
                            </>
                        ) : (
                            <>
                            <span>Study ID: {packageInfo.studyId}</span>
                            <FontAwesomeIcon
                                className="text-primary clickable"
                                icon={faEdit}
                                style={{ marginLeft: "0.5rem" }}
                                onClick={() => this.handleEditClick("Study ID")}
                            />
                            </>
                        )}
                        </div>
                    }
                    key={packageInfo.studyId}
                    isLeaf
                    selectable={false}
                    />
                );
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
			return <TreeNode className="metadataItem" title={title} key={eventKey} selectable={false} isLeaf/>;
		}
	}
    render() {
            let dtd = this.props.dtd;
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
