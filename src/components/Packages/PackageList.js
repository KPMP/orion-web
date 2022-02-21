import React, { Component } from 'react';
import PackagePanelContainer from './PackagePanelContainer';
import {Row} from 'reactstrap';
import PropTypes from 'prop-types';
import { getPackagesStateless } from '../../actions/Packages/packageActions'

class PackageList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            packages: {}
        };
        this.pollIfMounted = this.pollIfMounted.bind(this);
    }

    componentDidMount() {
        if(!this.isRemoteDataLoaded()) {
            let packages = this.getPackagesStateless();
            this.setState({packages: packages});
            this.props.setDtds(packages);
            //this.props.loadRemoteData();
        }

        this._isMounted = true;
        this.pollIfMounted();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    pollIfMounted() {
        if(this._isMounted) {
            this.props.poll(this.pollIfMounted);
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
                return <PackagePanelContainer key={index} index={index} uploadPackage={uploadPackage}/>;
            });
        }

        return (
        	<section id="packages-list" className="container-fluid">{
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
    packages: PropTypes.object,
}

export default PackageList;
