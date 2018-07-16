import React from 'react';
import { panes } from './components/Nav/NavBarContainer';
import PackagesContainer from './PackagesContainer';
import UploadContainer from './UploadContainer';

const PaneContainer = (props) => {
    switch (props.pane) {
        case panes.upload:
            return <UploadContainer />;
        case panes.packages:
        default:
            return <PackagesContainer />;
    }
}

export default PaneContainer;