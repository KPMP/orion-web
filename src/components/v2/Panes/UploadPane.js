import React, { Component } from 'react';
import UploadFormContainer from '../Upload/UploadFormContainer';

class UploadPane extends Component {

    render() {
    		return (
            <div className="pane">
                <UploadFormContainer />
            </div>
        )
    }
}

export default UploadPane;