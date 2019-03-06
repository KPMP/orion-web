import React, { Component } from 'react';
import PackagePanel from './PackagePanel';
import {Row, Col} from 'react-bootstrap';

class PackageList extends Component {

    componentDidMount() {
        this.props.getPackages();
    }

    render() {
        let isQuerying = this.props.packages.isQuerying === null || this.props.packages.isQuerying;
        let panels = [];

        if(!isQuerying) {
            panels = this.props.packages.filtered.map((uploadPackage, index) => {
                return <PackagePanel index={index} uploadPackage={uploadPackage}/>;
            });
        }

        return (
        	<section id="pkg-list" class="container-fluid">{
        	    isQuerying ?
                    <h4 id="pkg-querying" className="text-center">
                        Loading packages...
                    </h4>
                : panels.length > 0 ?
                    <Row>
                        {panels}
                    </Row>
                    :
                    <Row>
                        <Col className="noResults alert alert-info">
                            No packages returned for the selected criteria.
                        </Col>
                    </Row>
            }</section>
        );
    }
}

export default PackageList;