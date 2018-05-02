import React, { Component } from 'react';
import Gallery from 'react-fine-uploader';
import {  ControlLabel, Button } from 'react-bootstrap';
import FileList from './FileList';
import qq from 'fine-uploader/lib/core';

class AttachFilesTab extends Component {
	
    handleFileDescriptionChange = (event) => {
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
            this.props.updateFileDescription("");

            return;
        }
        
        alert("Please add another file to attach.");
    };
	
	render() {
		let files = this.props.uploader.methods.getUploads({
	            status: [ qq.status.SUBMITTED, qq.status.PAUSED ]
	        });
		let allowAttach = false;
		if (files.length !== 0) {
			allowAttach = true;
		}
		return (
			<div>
				<div>
	                <div className="modalTitle">Select File</div>
	                <Gallery fileInput-multiple={ false } uploader={ this.props.uploader } />
	                <div id="fileDescription" className="form-group">
	                    <ControlLabel htmlFor="fileDescription"><span className="modalTitle">Add File Description</span><span style={{color: "red"}}>*</span> <i>(each file requires a description)</i></ControlLabel>
	                    <textarea className="form-control" cols="63" row="6" onChange={this.handleFileDescriptionChange} id="fileDescription" name="fileDescription" placeholder="Please describe this file." value={this.props.fileDescription}></textarea>
	                </div>
	                <div className="row">
	                    <div className="col-12 text-center">
	                        <Button type="submit" className="btn-outline-dark" onClick={() => this.attachFiles()} disabled={!allowAttach}>Attach</Button>
	                    </div>
	                </div>
	                <hr/>
	                <div id="attachedFiles">
	                    <span style={{fontWeight: "bold"}}>Attached Files</span>
	                    <FileList files={this.props.fileList} />
	                </div>
	            </div>
	            <hr/>
	            <div>
	                <div className="row">
	                    <div className="col-6 float-left">
	                        <Button className="btn-outline-dark" bsStyle="default" onClick={() => this.props.cancel(this.props.uploader, this.props)}>Cancel</Button>
	                    </div>
	                    <div className="col-6">
	                    		<div className="float-right">
	                    			<Button className="btn-outline-dark" onClick={() => this.props.changeUploadTab(0)}>Back</Button>
	                    			&nbsp;
	                    			<Button bsStyle="primary" onClick={() => this.props.changeUploadTab(2)}>Next</Button>
	                        	</div>
	                    </div>
	                </div>
	            </div>		
            </div>
		);
	}
}

export default AttachFilesTab;