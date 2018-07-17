import React, { Component } from 'react';
import PackagePanel from './PackagePanel';

class PackageList extends Component {
    render() {
        const panels = [...Array(15).keys()].map(i => {
            const id = `20180529_${i}_PACKAGE_ID`;
            return <PackagePanel key={id} pkgId={id}/>;
        });
        return (
            <div id="pkg-list">
                {panels}
            </div>
        );
    }
}

export default PackageList;