import React from 'react';
import { panes } from './components/Nav/NavBarContainer';
import PackagesContainer from './PackagesContainer';

const PaneContainer = (props) => {
    switch (props.pane) {
        case panes.packages:
            return <PackagesContainer />;
        case panes.upload:
            return <div>Upload!</div>;
        default:
            return <div>Wut!</div>;
    }
}

export default PaneContainer;