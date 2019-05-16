import React, { Component } from 'react';
import PackagePanelContainer from './PackagePanelContainer';
import {Row} from 'reactstrap';
import PropTypes from 'prop-types';

class PackageList extends Component {

    componentDidMount() {
        if(!this.isRemoteDataLoaded()) {
            this.props.loadRemoteData();
        }
    }

    isRemoteDataLoaded() {
        return Object.keys(this.props.packages.unfiltered).length !== 0
            && this.props.packages.unfiltered.constructor === Array;
    }

    hasFilteredResults() {
        return Object.keys(this.props.packages.filtered).length !== 0
            && this.props.packages.filtered.constructor === Array;
    }

    render() {
        let message = null,
            panels = [];

        if (!this.isRemoteDataLoaded()) {
            message = "Loading packages...";
        }

        else if (!this.hasFilteredResults()) {
            message = "No packages returned for the selected criteria.";
        }

        else {
            panels = this.props.packages.filtered.map((uploadPackage, index) => {
                return <PackagePanelContainer index={index} uploadPackage={uploadPackage}/>;
            });
        }

        return (
        	<section id="packages-list" class="container-fluid">{
                message !== null ?
                    <h4 id="packages-querying" className="packages-querying text-center pt-3">
                        {message}
                    </h4>
                :
                    <Row>
                        {panels}
                    </Row>
            }</section>
        );
    }
}

PackageList.propTypes = {
    packages: PropTypes.array,
    loadRemoteData: PropTypes.func.isRequired
}

export default PackageList;
