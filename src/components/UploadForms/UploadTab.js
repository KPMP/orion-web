import React, { Component } from 'react'
import { Modal, Button, ButtonGroup, ControlLabel } from 'react-bootstrap';
import FineUploaderTraditional from 'fine-uploader-wrappers'
import qq from 'fine-uploader/lib/core'
import Gallery from 'react-fine-uploader'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FileList from './FileList';
import UploadPackageInfoForm from './UploadPackageInfoForm';


const uploader = new FineUploaderTraditional({
    options: {
        autoUpload: false,
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

    componentDidMount() {
        uploader.on('submit', (id, name) => {
            if (uploader.methods.getUploads({
                    status: qq.status.SUBMITTING
                }).length > 1) {
                alert("Please upload and attach one file at a time.");
                uploader.methods.cancelAll();
            }
        });
    }

    attachFiles = () => {
        var files = uploader.methods.getUploads({
            status: qq.status.SUBMITTED
        });
        console.log('files', files);

        if (files.length) {
            var file = files.pop();
            uploader.methods.cancelAll();
            file.description = this.props.fileDescription;
            this.props.appendToFileList(file);
            this.props.updateFileDescription("");
            return;
        }
        
        alert("Please add another file to attach.");
    };

    handleFileDescriptionChange = (event) => {
        this.props.updateFileDescription(event.target.value);
    };

    processUpload = () => {
        var files = this.props.fileList.map((file) => {
            return file.file;
        });
        console.log('files', files);
        uploader.methods.reset();
        uploader.methods.addFiles(files);
        console.log(uploader.methods.getUploads());
        uploader.methods.uploadStoredFiles();
        this.props.processUpload();
    };

    render() {
        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Body className="uploadFilesContainer">
                        <Tabs defaultIndex={0}>
                            <TabList>
                                <Tab>1: Define Upload</Tab>
                                <Tab>2: Attach Files</Tab>
                                <Tab>3: Review Upload</Tab>
                            </TabList>
                            <TabPanel>
                                <UploadPackageInfoForm uploadPackageInfo={this.props.uploadPackageInfo}/>
                            </TabPanel>
                            <TabPanel>
                                <div>
                                    <div className="modalTitle">Select File(s)</div>
                                    <Gallery fileInput-multiple={ false } uploader={ uploader } />
                                    <div className="form-group">
                                        <ControlLabel htmlFor="fileDescription">Description</ControlLabel>
                                        <textarea className="form-control" cols="63" row="6" onChange={this.handleFileDescriptionChange} id="fileDescription" name="fileDescription" placeholder="Please enter a file description..." value={this.props.fileDescription}></textarea>
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
                                            <Button className="btn-outline-dark" bsStyle="default" onClick={() => this.props.cancel()}>Cancel</Button>
                                        </div>
                                        <div className="col-6">
                                        		<ButtonGroup className="float-right">
                                        			<Button className="btn-outline-dark" >Back</Button>
                                        			&nbsp;
                                        			<Button bsStyle="primary">Next</Button>
                                            	</ButtonGroup>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                            		<div className="row">
                            			<div className="col-6 float-left">
                            				<Button className="btn-outline-dark" bsStyle="default" onClick={() => this.props.cancel()}>Cancel</Button>
                            			</div>
                            			<div className="col-6">
                            				<ButtonGroup className="float-right">
	                            				<Button className="btn-outline-dark">Back</Button> &nbsp;
	                            				<Button type="submit" bsStyle="primary" onClick={this.processUpload}>Start Upload</Button>
                            				</ButtonGroup>
                                		</div>
                                </div>
                            </TabPanel>
                        </Tabs>
                    </Modal.Body>
                </Modal.Dialog>
            </div>
        )
    }
}

export default UploadTab