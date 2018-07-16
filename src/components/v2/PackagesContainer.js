import React, { Component } from 'react';
import PackageSearch from './components/Packages/PackageSearch';
import PackageList from './components/Packages/PackageList';

class PackagesContainer extends Component {
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

export default PackagesContainer;