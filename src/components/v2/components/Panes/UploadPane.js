import React, { Component } from 'react';
import UploadControl from '../Upload/UploadControl';
import UploadForm from '../Upload/UploadForm';
import DefaultType from '../Upload/Types/DefaultType';
import { titles } from '../Upload/UploadTypeDropdown';

class UploadPane extends Component {
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

export default UploadPane;