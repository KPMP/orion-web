import React, { Component } from 'react';
import NavBarContainer, {panes} from './components/Nav/NavBarContainer';
import PaneContainer from './PaneContainer'

class UploaderContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pane: panes.packages
        }
    }

    handlePaneSelect = (pane) => {
        this.setState({
            pane
        });
    }

    render() {
        return (
            <div>
                <NavBarContainer pane={this.state.pane} handlePaneSelect={this.handlePaneSelect} />
                <PaneContainer pane={this.state.pane} />
            </div>
        );
    }
}

export default UploaderContainer;