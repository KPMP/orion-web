import React from 'react';
import { panes } from './Nav/NavBar';
import PackagesPaneContainer from './Packages/PackagesPaneContainer';
import UploadPane from './Upload/UploadPane';

const PaneHolder = (props) => {
    switch (props.pane) {
        case panes.upload:
            return <UploadPane />;
        case panes.packages:
        default:
            return <PackagesPaneContainer />;
    }
}

export default PaneHolder;