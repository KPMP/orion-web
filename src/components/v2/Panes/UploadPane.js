import React, { Component } from 'react';
import UploadControl from '../Upload/UploadControl';
import UploadForm from '../Upload/UploadForm';

class UploadPane extends Component {
    constructor(props) {
        super(props);
        this.state = {
            packageType: 'Select',
            packageTypeOther: ''
        };
    }

    handleSelect = (packageType) => {
    		this.setState({
            packageType: packageType
        });
    }
    
    handlePackageTypeOther = (packageTypeOther) => {
    		this.setState({packageTypeOther: packageTypeOther});
    }

    render() {
    		return (
            <div className="pane">
                <UploadControl title={this.state.packageType} handleSelect={this.handleSelect} handlePackageTypeOther={this.handlePackageTypeOther}/>
                <hr />
                <UploadForm packageType={this.state.packageType} packageTypeOther={this.state.packageTypeOther}/>
            </div>
        )
    }
}

export default UploadPane;