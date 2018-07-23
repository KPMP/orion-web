import React, { Component } from 'react';
import PackageSearch from '../Packages/PackageSearch';
import PackageListContainer from '../Packages/PackageListContainer';

class PackagesPane extends Component {
    render() {
        return (
            <div className="pane">
                <PackageSearch />
                <i>Search results are displayed in reverse chronological order</i>
                <PackageListContainer />
            </div>
        );
    }
}

export default PackagesPane;