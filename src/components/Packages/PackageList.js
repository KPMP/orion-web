import React, { Component } from 'react';
import PackagePanel from './PackagePanel';

class PackageList extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getPackages();
    }

    render() {
        const panels = this.props.packages.map((uploadPackage, index) => {
            return <PackagePanel index={index} uploadPackage={uploadPackage}/>;
        });
        return (
            <div id="pkg-list">
                {panels}
            </div>
        );
    }
}

export default PackageList;