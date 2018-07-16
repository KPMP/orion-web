import React, { Component } from 'react';
import PackageSearch from './components/Packages/PackageSearch';

class PackagesContainer extends Component {
    render() {
        return (
            <div id="pkg-pane">
                <PackageSearch />
            </div>
        );
    }
}

export default PackagesContainer;