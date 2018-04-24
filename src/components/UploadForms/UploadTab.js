import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';
import FineUploaderTraditional from 'fine-uploader-wrappers'
import qq from 'fine-uploader/lib/core'
import Gallery from 'react-fine-uploader'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FileList from './FileList';
import UploadPackageInfoForm from './UploadPackageInfoForm';


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
        }
    }
});

class UploadTab extends Component {
    constructor() {
        super();
        this.state = { tabIndex: 0 };
    }

    componentDidMount() {
        uploader.on('submit', (id, name) => {
            if (uploader.methods.getUploads({
                status: [ qq.status.SUBMITTING, qq.status.SUBMITTED, qq.status.PAUSED ]
            }).length > 1 && this.state.tabIndex === 1) {
                alert("Please upload and attach one file at a time.");
                return false;
            }

            return true;
        });
        uploader.on('upload', (id, name) => {
            if (this.state.tabIndex === 2) {
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
                        <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex: tabIndex })} forceRenderTabPanel={true}>
                            <TabList>
                                <Tab>Define Upload</Tab>
                                <Tab>Attach Files</Tab>
                                <Tab>Review Upload</Tab>
                            </TabList>
                            <TabPanel>
                                <UploadPackageInfoForm onSubmit={data => { this.props.uploadPackageInfo(data) }} />
                            </TabPanel>
                            <TabPanel>
                                <div>
                                    <h3>Select File(s)</h3>
                                    <Gallery fileInput-multiple={ false } uploader={ uploader } />
                                    <div className="form-group">
                                        <label htmlFor="fileDescription">Description</label>
                                        <textarea className="form-control" cols="63" row="6" onChange={this.handleFileDescriptionChange} id="fileDescription" name="fileDescription" placeholder="Please enter a file description..." value={this.props.fileDescription}></textarea>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 text-center">
                                            <Button type="submit" bsStyle="primary" onClick={() => this.attachFiles()}>Attach</Button>
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
                                        <div className="col-md-6 pull-left">
                                            <Button bsStyle="default" onClick={() => this.props.cancel()}>Cancel</Button>
                                        </div>
                                        <div className="col-md-6 pull-right">
                                            <Button bsStyle="primary">Back</Button>
                                        &nbsp;
                                            <Button bsStyle="primary">Next</Button>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <Button type="submit" bsStyle="primary" onClick={() => this.props.processUpload()}>Upload</Button>
                            </TabPanel>
                        </Tabs>
                    </Modal.Body>
                </Modal.Dialog>
            </div>
        )
    }
}

export default UploadTab