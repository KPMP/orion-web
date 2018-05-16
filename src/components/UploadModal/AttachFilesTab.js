import React, { Component } from 'react';
import Gallery from 'react-fine-uploader';
import {  ControlLabel, Button } from 'react-bootstrap';
import FileList from './FileList';
import qq from 'fine-uploader/lib/core';

class AttachFilesTab extends Component {
	
	constructor() {
		super();
		this.state = { fileAttached: false, descriptionSet: false, showMultiFileMessage: false, showDuplicateFileMessage: "" };
	}
	
	componentDidMount() {
		this.props.uploader.on('upload', (id, name) => {
            if (this.props.currentTab === 2) {
                return true;
            }
			this.setState({fileAttached: true});
            return { pause: true };
        });
		this.props.uploader.on('submit', (id, name) => {
			var newFiles = this.props.uploader.methods.getUploads({
		            status: [ qq.status.SUBMITTING ]
		    });
            if (this.props.uploader.methods.getUploads({
		            status: [ qq.status.SUBMITTING, qq.status.SUBMITTED, qq.status.PAUSED ]
		    }).length > 1 && this.props.currentTab === 1) {
                this.setState({showMultiFileMessage: true});
                return false;
            } else {
            		let inError = false;
                for (let i in this.props.fileList) {
                		if (this.props.fileList[i].name === newFiles[0].name) {
             			inError = true;
             		}
                }
                if (inError) {
                 	this.setState({showDuplicateFileMessage: newFiles[0].name});
                } else {
                 	this.setState({showDuplicateFileMessage: ""});
                }
            		this.setState({ showMultiFileMessage: false });
            }

            return true;
        });
	}
	
    handleFileDescriptionChange = (event) => {
    		if (event.target.value !== "" && event.target.value !== undefined) {
    			this.setState( { descriptionSet: true });
    		} else {
    			this.setState( {descriptionSet: false});
    		}
        this.props.updateFileDescription(event.target.value);
    };
    
    attachFiles = () => {
        var files = this.props.uploader.methods.getUploads({
            status: [ qq.status.SUBMITTED, qq.status.PAUSED ]
        });

        if (files.length) {
            var file = files.pop();

            file.fileMetadata = this.props.fileDescription;
            this.props.uploader.methods.cancel(file.id);
            	this.props.appendToFileList(file);
            	this.setState({ fileAttached: false, descriptionSet: false, showMultiFileMessage: false, showDuplicateFileMessage: "" });
            return;
        }
        
    };
	
   
    shouldNextBeDisabled = () => {
    		if (this.props.fileList.length > 0) {
    			return false;
    		}
    		return true;
    }
    
	render() {
		return (
			<div>
				<div>
	                <div className="modalTitle">Select File
	                		{ this.state.showMultiFileMessage && <div className="attachFileError">Only one file may be added at a time.</div> }
	                		{ this.state.showDuplicateFileMessage !== "" && <div className="attachFileError">You have already selected {this.state.showDuplicateFileMessage} to upload.</div>}
	                </div>
	                <Gallery fileInput-multiple={ false } uploader={ this.props.uploader } />
	                <div id="fileDescription" className="form-group">
	                    <ControlLabel htmlFor="fileDescription"><span className="modalTitle">Add File Description</span><span style={{color: "red"}}>*</span> <i>(each file requires a description)</i></ControlLabel>
	                    <textarea className="form-control" cols="63" row="6" onChange={this.handleFileDescriptionChange} id="fileDescription" name="fileDescription" placeholder="Please describe this file." value={this.props.fileDescription}></textarea>
	                </div>
	                <div className="row">
	                    <div className="col-12 text-center">
	                        <Button type="submit" className="btn-outline-dark" onClick={() => this.attachFiles()} disabled={!(this.state.fileAttached && this.state.descriptionSet && this.state.showDuplicateFileMessage === "")}>Attach</Button>
	                    </div>
	                </div>
	                <hr/>
	                <div id="attachedFiles">
	                    <span style={{fontWeight: "bold"}}>Attached Files</span>
	                    <FileList files={this.props.fileList} allowDelete={true} removeFile={this.props.removeFileFromList}/>
	                </div>
	            </div>
	            <hr/>
	            <div>
	                <div className="row">
	                		<div className="buttonRow">
		                    <div className="col-sm-6">
		                        <Button className="btn-outline-dark pull-left" bsStyle="default" onClick={() => this.props.cancel(this.props.uploader, this.props)}>Cancel</Button>
		                    </div>
		                    <div className="col-sm-6">
		                    		<div className="pull-right">
		                    			<Button className="btn-outline-dark" onClick={() => this.props.changeUploadTab(0)}>Back</Button>
		                    			&nbsp;
		                    			<Button bsStyle="primary" onClick={() => this.props.changeUploadTab(2)} disabled={this.shouldNextBeDisabled()}>Next</Button>
		                        	</div>
		                    </div>
		                </div>
	                </div>
	            </div>		
            </div>
		);
	}
}

export default AttachFilesTab;