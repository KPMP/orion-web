import React from 'react';
import { panes } from './Nav/NavBar';
import PackagesPane from './Packages/PackagesPane';
import UploadPane from './Upload/UploadPane';

const PaneHolder = (props) => {
    switch (props.pane) {
        case panes.upload:
            return <UploadPane />;
        case panes.packages:
        default:
            return <PackagesPane />;
    }
}

export default PaneHolder;