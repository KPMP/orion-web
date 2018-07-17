import React, { Component } from 'react';
import PackageSearch from '../Packages/PackageSearch';
import PackageList from '../Packages/PackageList';

class PackagePane extends Component {
    render() {
        return (
            <div className="pane">
                <PackageSearch />
                <i>Search results are displayed in reverse chronological order</i>
                <PackageList />
            </div>
        );
    }
}

export default PackagePane;