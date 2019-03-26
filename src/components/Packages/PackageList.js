import React, { Component } from 'react';
import PackagePanel from './PackagePanel';
import {Row, Col} from 'reactstrap';

class PackageList extends Component {

    componentDidMount() {
        if(!this.isRemoteDataLoaded()) {
            this.props.loadRemoteData();
        }
    }

    isRemoteDataLoaded() {
        return Object.keys(this.props.packages.filtered).length !== 0
            && this.props.packages.filtered.constructor === Array;
    }

    render() {
        let isQuerying = !this.isRemoteDataLoaded();
        let panels = [];

        if(!isQuerying) {
            panels = this.props.packages.filtered.map((uploadPackage, index) => {
                return <PackagePanel index={index} uploadPackage={uploadPackage} currentDTD={this.props.formDTD}/>;
            });
        }

        return (
        	<section id="packages-list" class="container-fluid">{
        	    isQuerying ?
                    <h4 id="packages-querying" className="packages-querying text-center pt-3">
                        Loading packages...
                    </h4>
                : panels.length > 0 ?
                    <Row>
                        {panels}
                    </Row>
                    :
                    <Row>
                        <Col className="alert alert-info">
                            No packages returned for the selected criteria.
                        </Col>
                    </Row>
            }</section>
        );
    }
}

export default PackageList;
