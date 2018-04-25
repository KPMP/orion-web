import React, { Component } from 'react'
import { Modal, Button, ButtonGroup, ControlLabel } from 'react-bootstrap';
import FineUploaderTraditional from 'fine-uploader-wrappers'
import qq from 'fine-uploader/lib/core'
import Gallery from 'react-fine-uploader'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FileList from './FileList';
import UploadPackageInfoForm from './UploadPackageInfoForm';
import ReviewUpload from './ReviewUpload';


const uploader = new FineUploaderTraditional({
    options: {
        debug: true,
        autoUpload: true,
        maxConnections: 3,
        chunking: {
            enabled: true
        },
        request: {
            endpoint: 'http://localhost:3030/upload'
        },
        retry: {
            enableAuto: false
        },
        callbacks: {
        		onAllComplete: function(succeeded, failed) {
        			this.props.showUploadModal(false);
        		}
        }
    }
});

class UploadTab extends Component {

    componentDidMount() {
        uploader.on('submit', (id, name) => {
            if (uploader.methods.getUploads({
                status: [ qq.status.SUBMITTING, qq.status.SUBMITTED, qq.status.PAUSED ]
            }).length > 1 && this.props.currentTab === 1) {
                alert("Please upload and attach one file at a time.");
                return false;
            }

            return true;
        });
        uploader.on('upload', (id, name) => {
            if (this.props.currentTab === 2) {
                return true;
            }

            return { pause: true };
        });
    }

    componentDidUpdate() {
        if (this.props.packageInfo) {
            uploader.methods.reset();

            this.props.fileList.forEach((file, id) => {
                uploader.methods.setParams({ fileMetadata: file.fileMetadata, ...this.props.packageInfo }, id);
                uploader.methods.addFiles([this.props.fileList[id].file]);
            });

            uploader.methods.uploadStoredFiles();
           
        }
    }

    attachFiles = () => {
        var files = uploader.methods.getUploads({
            status: [ qq.status.SUBMITTED, qq.status.PAUSED ]
        });

        if (files.length) {
            var file = files.pop();

            file.fileMetadata = this.props.fileDescription;
            uploader.methods.cancel(file.id);
            this.props.appendToFileList(file);
            this.props.updateFileDescription("");

            return;
        }
        
        alert("Please add another file to attach.");
    };

    handleFileDescriptionChange = (event) => {
        this.props.updateFileDescription(event.target.value);
    };

    render() {
        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Body className="uploadFilesContainer">
                        <Tabs selectedIndex={this.props.currentTab} onSelect={tabIndex => this.props.changeUploadTab(tabIndex)} forceRenderTabPanel={true}>
                            <TabList>
                                <Tab>1: Define Upload</Tab>
                                <Tab>2: Attach Files</Tab>
                                <Tab>3: Review Upload</Tab>
                            </TabList>
                            <TabPanel>
                                <UploadPackageInfoForm uploadPackageInfo={this.props.uploadPackageInfo} changeUploadTab={this.props.changeUploadTab} showUploadModal={this.props.showUploadModal} onSubmit={data => { this.props.uploadPackageInfo(data) }} />
                            </TabPanel>
                            <TabPanel>
                                <div>
                                    <div className="modalTitle">Select File(s)</div>
                                    <Gallery fileInput-multiple={ false } uploader={ uploader } />
                                    <div className="form-group">
                                        <ControlLabel htmlFor="fileDescription">Description* <i>(each file requires a description)</i></ControlLabel>
                                        <textarea className="form-control" cols="63" row="6" onChange={this.handleFileDescriptionChange} id="fileDescription" name="fileDescription" placeholder="Please describe this file." value={this.props.fileDescription}></textarea>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 text-center">
                                            <Button type="submit" className="btn-outline-dark" onClick={() => this.attachFiles()}>Attach</Button>
                                        </div>
                                    </div>
                                    <div>
                                        <span>Attached Files</span>
                                        <FileList files={this.props.fileList} />
                                    </div>
                                </div>
                                <hr/>
                                <div>
                                    <div className="row">
                                        <div className="col-6 float-left">
                                            <Button className="btn-outline-dark" bsStyle="default" onClick={() => this.props.showUploadModal(false)}>Cancel</Button>
                                        </div>
                                        <div className="col-6">
                                        		<ButtonGroup className="float-right">
                                        			<Button className="btn-outline-dark" onClick={() => this.props.changeUploadTab(0)}>Back</Button>
                                        			&nbsp;
                                        			<Button bsStyle="primary" onClick={() => this.props.changeUploadTab(2)}>Next</Button>
                                            	</ButtonGroup>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                            	<ReviewUpload changeUploadTab={this.props.changeUploadTab} showUploadModal={this.props.showUploadModal} processUpload={this.props.processUpload} />
                            </TabPanel>
                        </Tabs>
                    </Modal.Body>
                </Modal.Dialog>
            </div>
        )
    }
}

export default UploadTab