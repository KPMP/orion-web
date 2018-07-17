import React, { Component } from 'react';
import NavBar, {panes} from '../Nav/NavBar';
import PaneHolder from '../Panes/PaneHolder'

class UploadPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pane: panes.packages
        };
    }

    handlePaneSelect = (pane) => {
        this.setState({
            pane
        });
    }

    render() {
        return (
            <div>
                <NavBar pane={this.state.pane} handlePaneSelect={this.handlePaneSelect} />
                <PaneHolder pane={this.state.pane} />
            </div>
        );
    }
}

export default UploadPage;