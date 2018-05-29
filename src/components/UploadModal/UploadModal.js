import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';
import FineUploaderTraditional from 'fine-uploader-wrappers';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PackageInfoForm from './PackageInfoForm';
import FileProgressModal from "../FileProgressModal/FileProgressModal";
import FileList from './FileList';
import AttachFilesTab from './AttachFilesTab';

let BASE_URL = 'http://localhost:3030';
if (process.env.REACT_APP_ENVIRONMENT === 'production') {
	BASE_URL = 'http://upload.kpmp.org:3030';
} else if (process.env.REACT_APP_ENVIRONMENT === 'dev') {
	BASE_URL = 'http://141.214.4.23:3030/';
}

const ReviewControls = ({ changeUploadTab, processUpload, cancel, uploadDisabled }) => (
		<div className="row">
	    		<div className="buttonRow">
		        <div className="col-sm-6">
		            <Button className="btn-outline-dark pull-left" bsStyle="default" onClick={() => cancel()}>Cancel</Button>
		        </div>
		        <div className="col-sm-6">
		            <div className="pull-right">
		                <Button className="btn-outline-dark" onClick={() => changeUploadTab(1)}>Back</Button> &nbsp;
		                <Button type="submit" bsStyle="primary" onClick={() => processUpload()} disabled={uploadDisabled}>Start Upload</Button>
		            </div>
		        </div>
	        </div>
	    </div>
);

const ReviewPanel = ({ props, cancel }) => {
    const { form, changeUploadTab, processUpload, fileList } = props;
    let values = {};
    let uploadDisabled = false;

    if (!form.uploadPackageInfoForm || !form.uploadPackageInfoForm.values) {
        uploadDisabled = true;
    } else {
        values = form.uploadPackageInfoForm.values;
    }

    let packageType = values.packageType;
    if (values.packageTypeOther !== undefined) {
    		packageType = values.packageTypeOther;
    }
    return (
    		<div>
            <div id="packageInfo">
                <div id="packageDescription">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="modalTitle">Review Upload</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <strong>Name:</strong>
                        </div>
                        <div className="col-sm-8">
                            <span>{ values.firstName } { values.lastName }</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <strong>Site Name:</strong>
                        </div>
                        <div className="col-sm-8">
                            { values.institutionName }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <strong>Package Type:</strong>
                        </div>
                        <div className="col-sm-8">
                        		{packageType}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <strong>Experiment #:</strong>
                        </div>
                        <div className="col-sm-8">
                            { values.experimentId }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <strong>Subject #:</strong>
                        </div>
                        <div className="col-sm-8">
                            { values.subjectId }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <strong>Experiment Date:</strong>
                        </div>
                        <div className="col-sm-8">
                            { values.experimentDate }
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 uploadFileList">
                        <FileList files={ fileList }/>
                    </div>
                </div>
            </div>
            <ReviewControls changeUploadTab={changeUploadTab} processUpload={processUpload} cancel={cancel} uploadDisabled={uploadDisabled}/>
        </div>
    );
};

class UploadModal extends Component {

	constructor(props) {
		super();

		this.uploader = new FineUploaderTraditional({
		    options: {
		        debug: true,
		        autoUpload: true,
		        maxConnections: 3,
		        chunking: {
		            enabled: true
		        },
		        request: {
		            endpoint: BASE_URL + '/upload'
		        },
		        retry: {
		            enableAuto: false
		        }
		    }
		});
	}

    componentDidMount() {
        
        this.uploader.on('allComplete', (success, failure) => {
            this.props.updateUploadStatus("complete");
        });
        
        this.uploader.on('error', (fileId, filename, errorReason, xhr) => {
            // for some reason we always get an undefined file here, so we are just ignoring it for now.
            if (filename !== undefined) {
                alert("We encountered an error uploading file: " + filename + "\n With reason: " + errorReason);
                // just becasue the back end had trouble doesn't mean we need to toss the queue
                this.props.changeUploadTab(1);
            }
        });
    }

    componentDidUpdate() {
        if (this.props.packageInfo && !this.props.showFileProgressModal) {
            this.uploader.methods.reset();

            this.props.fileList.forEach((file, id) => {
                this.uploader.methods.setParams({ fileMetadata: file.fileMetadata, ...this.props.packageInfo }, id);
                this.uploader.methods.addFiles([this.props.fileList[id].file]);
            });
            this.props.showFileProgress(true);
            this.uploader.methods.uploadStoredFiles();
        }
    }

    cancel = () => {
    		this.uploader.methods.cancelAll();
    		this.uploader.methods.clearStoredFiles(); 
    		this.uploader.methods.reset();
        this.props.resetModals();
    };
    
    switchTabs = (tabIndex) => {
    		this.props.changeUploadTab(tabIndex)
    }

    render = () => {
        return (
            <div>
                <div className="uploadFilesModal static-modal">
                    <Modal show={this.props.showUploadModal} className="uploadFilesModal">
                        <Modal.Body className="uploadFilesContainer">
                            <Tabs selectedIndex={this.props.currentTab} onSelect={(tabIndex) => this.switchTabs(tabIndex)} forceRenderTabPanel={true}>
                                <TabList>
                                    <Tab>1: Define Upload</Tab>
                                    <Tab>2: Attach Files</Tab>
                                    <Tab>3: Review Upload</Tab>
                                </TabList>
                                <TabPanel>
                                    <PackageInfoForm uploadPackageInfo={this.props.uploadPackageInfo} changeUploadTab={this.props.changeUploadTab} onSubmit={data => { this.props.uploadPackageInfo(data) }} cancel={this.cancel} />
                                </TabPanel>
                                <TabPanel>
                                    <AttachFilesTab uploader={this.uploader} {...this.props} cancel={this.cancel}/>
                                </TabPanel>
                                <TabPanel>
                                    <ReviewPanel props={ this.props } cancel={this.cancel}/>
                                </TabPanel>
                            </Tabs>
                        </Modal.Body>
                    </Modal>
                </div>
                <FileProgressModal show={this.props.showFileProgressModal} uploader={ this.uploader } fileList= { this.props.fileList } cancel={ this.cancel } uploadStatus={ this.props.uploadStatus }/>
            </div>
        )
    }
}

export default UploadModal
