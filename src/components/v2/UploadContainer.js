import React, { Component } from 'react';
import UploadControl from './components/Upload/UploadControl';
import UploadForm from './components/Upload/UploadForm';
import DefaultType from './components/Upload/Types/DefaultType';
import { titles } from './components/Upload/UploadTypeDropdown';

class UploadContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: DefaultType
        };
    }

    handleSelect = (comp) => {
        this.setState({
            selected: comp
        });
    }

    render() {
        return (
            <div className="pane">
                <UploadControl title={titles[this.state.selected.Type]} handleSelect={this.handleSelect}/>
                <hr />
                <UploadForm comp={this.state.selected} />
            </div>
        )
    }
}

export default UploadContainer;