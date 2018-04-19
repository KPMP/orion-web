import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';
import FineUploaderTraditional from 'fine-uploader-wrappers'
import Gallery from 'react-fine-uploader'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FileList from './FileList';

const uploaderDropzone = new FineUploaderTraditional({
    options: {
        autoUpload: false
    }
});

const uploaderFinal = new FineUploaderTraditional({
    options: {
        chunking: {
            enabled: true
        },
        deleteFile: {
            enabled: false,
            endpoint: '/uploads'
        },
        request: {
            endpoint: 'http://localhost:3030/upload'
        },
        retry: {
            enableAuto: false
        },
        autoUpload: false
    }
});

class UploadTab extends Component {

    moveFiles = () => {
        let files = uploaderDropzone.methods.getUploads();
        files.forEach((file) => {
            uploaderFinal.methods.addFiles([uploaderDropzone.methods.getFile(file.id)]);
            uploaderFinal.methods.setParams({description: this.props.fileDescription}, file.id);
            this.props.appendToFileList(file.id, file.name, this.props.fileDescription);
        });
    };

    handleFileDescriptionChange = (event) => {
        this.props.updateFileDescription(event.target.value);
    };

    render() {
        return (
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Body className="uploadFilesContainer">
                        <Tabs defaultIndex={1}>
                            <TabList>
                                <Tab>Define Upload</Tab>
                                <Tab>Attach Files</Tab>
                                <Tab>Review Upload</Tab>
                            </TabList>
                            <TabPanel>
                            </TabPanel>
                            <TabPanel>
                                <div>
                                    <h3>Select File(s)</h3>
                                    <Gallery uploader={ uploaderDropzone } />
                                    <div>
                                        <label htmlFor="fileDescription">Description</label>
                                        <textarea cols="63" row="6" onChange={this.handleFileDescriptionChange} id="fileDescription" name="fileDescription">{this.props.fileDescription}</textarea>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 text-center">
                                            <Button type="submit" bsStyle="primary" onClick={() => this.moveFiles()}>Attach</Button>
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
                                            <Button type="submit" bsStyle="primary">Back</Button>
                                        &nbsp;
                                            <Button type="submit" bsStyle="primary">Next</Button>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <Button type="submit" bsStyle="primary" onClick={() => uploaderFinal.methods.uploadStoredFiles()}>Upload</Button>
                            </TabPanel>
                        </Tabs>
                    </Modal.Body>
                </Modal.Dialog>
            </div>
        )
    }
}

export default UploadTab