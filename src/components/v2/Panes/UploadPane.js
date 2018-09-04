import React, { Component } from 'react';
import UploadControl from '../Upload/UploadControl';
import UploadForm from '../Upload/UploadForm';

class UploadPane extends Component {
    constructor(props) {
        super(props);
        this.state = {
            packageType: 'Select'
        };
    }

    handleSelect = (packageType) => {
    		this.setState({
            packageType: packageType
        });
    }

    render() {
    		return (
            <div className="pane">
                <UploadControl title={this.state.packageType} handleSelect={this.handleSelect}/>
                <hr />
                <UploadForm packageType={this.state.packageType} />
            </div>
        )
    }
}

export default UploadPane;