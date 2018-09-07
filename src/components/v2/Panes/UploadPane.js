import React, { Component } from 'react';
import UploadForm from '../Upload/UploadForm';

class UploadPane extends Component {

    render() {
    		return (
            <div className="pane">
                <UploadForm />
            </div>
        )
    }
}

export default UploadPane;