import React, { Component } from 'react';
import UploadControl from '../Upload/UploadControl';
import UploadForm from '../Upload/UploadForm';

class UploadPane extends Component {
    constructor(props) {
        super(props);
        this.state = {
            packageType: undefined
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
                <UploadControl title={'Select'} handleSelect={this.handleSelect}/>
                <hr />
                <UploadForm packageType={this.state.packageType} />
            </div>
        )
    }
}

export default UploadPane;