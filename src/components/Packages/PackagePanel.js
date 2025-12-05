import React, { Component } from 'react';
import { Col, Row, Button, UncontrolledPopover, PopoverBody } from 'reactstrap';
import { getLocalDateString, getLocalTimeString } from '../../helpers/timezoneUtil';
import { shouldColorRow } from './attachmentsModalRowHelper.js';
import { getDataTypeIconInfo } from './dataTypeIconHelper.js';
import AttachmentsModal from './AttachmentsModal';
import MetadataModal from './MetadataModal';
import LargeFileModal from './LargeFileModal';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PackagePanelStateText from './PackagePanelStateText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faLock, faLockOpen, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { lockPackage } from '../../actions/Packages/packageActions';

class PackagePanel extends Component {

	constructor(props) {
		super(props);
		this.state = { 
			showAttachments: false, 
			showMetadata: false, 
			showLargeFile: false, 
			showPopover: true
		};
		this.handleAttachmentClick = this.handleAttachmentClick.bind(this);
		this.handleMetadataClick = this.handleMetadataClick.bind(this);
		this.handleLargeFileClick = this.handleLargeFileClick.bind(this);
		this.handleStateInfoClick = this.handleStateInfoClick.bind(this);
		this.handleLockPackageClick = this.handleLockPackageClick.bind(this);
		this.showHidePopover = this.showHidePopover.bind(this);
	}
	
	handleAttachmentClick() {
		let show = !this.state.showAttachments;
		this.setState({ showAttachments: show });
	}

	handleMetadataClick() {
		let show = !this.state.showMetadata;
		this.setState({ showMetadata: show });
	}

	handleLargeFileClick() {
		let show = !this.state.showLargeFile;
		this.setState({ showLargeFile: show });
	}

	handleStateInfoClick() {
		if (this.props.uploadPackage.state.state === 'METADATA_RECEIVED') {
			let show = !this.state.showLargeFile;
			this.setState({ showLargeFile: show });
		}
	}

	async handleLockPackageClick(packageId) {
		let status = await lockPackage(packageId); 
		if (status === 200) {
			this.props.lockPackage(this.props.index);
		}
	}

	showHidePopover() {
		this.setState(previousState => ({ 
			showPopover: !previousState.showPopover 
		}), () => {
			this.setState(previousState => ({
				showPopover: !previousState.showPopover
			}));
		}); 
	}

	render() {
		let packageInfo = this.props.uploadPackage.packageInfo;
		let packageTypeIcons = this.props.packageTypeIcons;
        let lastModifiedDate = null
        let lastModifiedTime = null
        if ("modifiedAt" in packageInfo){
            lastModifiedDate = getLocalDateString(packageInfo.modifiedAt);
            lastModifiedTime = getLocalTimeString(packageInfo.modifiedAt);
        }
		let submittedDate = getLocalDateString(packageInfo.createdAt);
		let submittedTime = getLocalTimeString(packageInfo.createdAt);
		let { iconDataType, iconImage } = getDataTypeIconInfo(packageTypeIcons, packageInfo.packageType);
		return (
			<section className='package'>
				<Row className={
						(shouldColorRow(this.props.index) ? 'bg-light ' : ' ') +
						'border rounded no-gutters px-2 py-2 mx-2 my-2'}>
					<Col xs={12} md={9} className='media align-items-center'>
						<img src={'img/' + iconImage} alt={iconDataType} height='80px' />
						<Row className='media-body mx-2 d-flex align-items-center'>
							<Col xs={12} className='pb-1'><b>{packageInfo.subjectId}</b></Col>
							<Col xs={12} className='pb-1'>{packageInfo.packageType}</Col>
							<Col xs={12}>Submitted <b>{submittedDate}</b> at {submittedTime} by {packageInfo.submitter.firstName} {packageInfo.submitter.lastName}, {packageInfo.siteName}</Col>
                            {
                                "modifiedAt" in packageInfo ? <Col xs={12} className='pb-1'>Last Modified: {lastModifiedDate} at {lastModifiedTime}</Col> : null
                            }
							<Col xs={12} className='pb-1'>Upload ID: {packageInfo._id}</Col>
							<Col xs={12} className='pb-1'>Biopsy ID: {packageInfo.biopsyId}</Col>
                            <Col xs={12} className='pb-1'>Study ID: {packageInfo.studyId}</Col>
						</Row>
					</Col>
					<Col xs={12} md={3}>
						<Row>
							<Col xs={4} md={10} lg={8} className='text-nowrap'>
								{/* eslint-disable-next-line */} 
								{(this.props.uploadPackage.state.state !== "UPLOAD_LOCKED" && 
								(this.props.userInformation?.email == packageInfo.submitter.email || 
								this.props.userInformation?.roles.includes("uploader_admin"))) ? 
								(<a onClick={this.handleAttachmentClick}>View/edit attachments ({this.props.uploadPackage.packageInfo.files.length})</a>) : 
								(<a onClick={this.handleAttachmentClick}>View attachments ({this.props.uploadPackage.packageInfo.files.length})</a>)}
							</Col>
							{
								(this.props.userInformation?.roles.includes("uploader_admin")) &&
								<Col xs={4} md={2} lg={4} className='text-center'>
										{	
											(this.props.uploadPackage.state.state !== "UPLOAD_LOCKED") ? 
											(
												<div>
													<FontAwesomeIcon className='text-primary clickable' id={"Popover-" + this.props.index} icon={faLockOpen} title='Unlocked' />
													{
														(this.state.showPopover &&
														<UncontrolledPopover 
															placement="bottom" 
															target={"Popover-" + this.props.index} 
															trigger="legacy"
															modifiers={{
																preventOverflow: {enabled: false},
																hide: {enabled: false},
																flip: {enabled: false}
															}} className="panel-popover" >
															<PopoverBody>
																<p className='confirmPopoverText'><b>Are you sure?</b></p>
																<FontAwesomeIcon icon={faSquareXmark} onClick={this.showHidePopover} className='text-danger xMark clickable' title='Cancel' />
																<FontAwesomeIcon icon={faCheckSquare} onClick={() => {this.handleLockPackageClick(packageInfo._id)}} className='text-success checkMark clickable' title='Confirm' />
															</PopoverBody>
														</UncontrolledPopover>)
													}
												</div>
											)
											: (<FontAwesomeIcon className='text-dark' icon={faLock} title='Locked' />)
										}
								</Col>
							}
							<Col xs={4} md={12}>
								{/* eslint-disable-next-line */} 
								<a className='d-block pb-1' onClick={this.handleMetadataClick}>Show upload metadata</a>
							</Col>
							{this.props.uploadPackage.state &&
							<Col xs={4} md={12} className='mb-1'>
								<PackagePanelStateText
									handleStateInfoClick={this.handleStateInfoClick}
									panelState={this.props.uploadPackage.state}
									currentUser={this.props.userInformation}
									packageSubmitter={packageInfo.submitter}
									largeFileUpload={packageInfo.largeFilesChecked}
									stateDisplayMap={this.props.stateDisplayMap}
								/>
							</Col>
							}
							{
								(this.props.userInformation?.roles.includes("uploader_admin")) &&
								<Col xs={4} md={12} className='mb-1' >
									<Link to={"/datalake/" + packageInfo.study.replace(/\s/g, '') + "/package_" + packageInfo._id} target="_blank" className="d-block-inline">
										<Button 
											color="primary"
											className="btn-sm packages-button-open-folder">
											Open Folder
										</Button>
									</Link>
								</Col>
							}
					   </Row>
				   </Col>
				</Row>
				
				<AttachmentsModal 
					currentUser={this.props.userInformation} 
					packageSubmitter={packageInfo.submitter} 
					packageState={this.props.uploadPackage.state.state}
					show={this.state.showAttachments} 
					attachments={this.props.uploadPackage.packageInfo.files}
                    packageId={packageInfo._id}
					close={this.handleAttachmentClick}
				    uploadFiles={this.props.uploadFiles}
					replaceFile={this.props.replaceFile}/>
				<MetadataModal 
					userInformation={this.props.userInformation} 
					show={this.state.showMetadata} uploadPackage={packageInfo} 
					close={this.handleMetadataClick} dtds={this.props.dtds} 
					updatePackageMetadata={this.props.updatePackageMetadata}
					index={this.props.index}/>
				<LargeFileModal show={this.state.showLargeFile} close={this.handleLargeFileClick} link={this.props.uploadPackage.state ? this.props.uploadPackage.state.codicil: ''}/>
			</section>
		);
	}
}

PackagePanel.propTypes = {
	uploadPackage: PropTypes.object.isRequired,
	packageTypeIcons: PropTypes.array.isRequired,
	dtds: PropTypes.object.isRequired,
	userInformation: PropTypes.object.isRequired,
	stateDisplayMap: PropTypes.array.isRequired,
	uploadFiles: PropTypes.func.isRequired,
	replaceFile: PropTypes.func.isRequired
}

export default PackagePanel;
