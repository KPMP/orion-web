import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap';
import FineUploaderTraditional from 'fine-uploader-wrappers'
import qq from 'fine-uploader/lib/core'
import Gallery from 'react-fine-uploader'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FileList from './FileList';

const uploader = new FineUploaderTraditional({
    options: {
        autoUpload: false,
        chunking: {
            enabled: true
        },
        request: {
            endpoint: 'http://localhost:3030/upload'
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
            uploader.methods.cancelAll();
            this.props.appendToFileList(files.pop(), this.props.fileDescription);
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
                                <Button type="submit" bsStyle="primary" onClick={() => uploader.methods.uploadStoredFiles()}>Upload</Button>
                            </TabPanel>
                        </Tabs>
                    </Modal.Body>
                </Modal.Dialog>
            </div>
        )
    }
}

export default UploadTab