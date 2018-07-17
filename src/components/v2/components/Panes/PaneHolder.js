import React from 'react';
import { panes } from '../Nav/NavBar';
import PackagePane from '../Panes/PackagePane';
import UploadPane from '../Panes/UploadPane';

const PaneHolder = (props) => {
    switch (props.pane) {
        case panes.upload:
            return <UploadPane />;
        case panes.packages:
        default:
            return <PackagePane />;
    }
}

export default PaneHolder;