import React, { Component } from 'react';
import PackagePanelContainer from './PackagePanelContainer';
import {Row} from 'reactstrap';
import PropTypes from 'prop-types';
import { packages as packageReducer, applyFilters } from "./packagePanelReducer";
import { getPackagesStateless } from '../../actions/Packages/packageActions'
import initialState from '../../initialState';
import actionNames from '../../actions/actionNames'

class PackageList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            packages: [],
        };
        this.pollIfMounted = this.pollIfMounted.bind(this);
    }

    async componentDidMount() {
        if(!this.isRemoteDataLoaded()) {
            let packages = await getPackagesStateless();
            this.props.setDtds(packages);
            //let packagesFiltered = packageReducer(this.state.packages, {type: actionNames.SET_PACKAGES, payload: packages});
            this.setState({ packages: packages });
        }

        this._isMounted = true;
        this.pollIfMounted();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if (this.props.filtering !== prevProps.filtering) {
            this.setState({packages: applyFilters(this.props.filtering.filters, this.state.packages, this.props.filtering.packageTypes)});
        }
    }

    pollIfMounted() {
        if(this._isMounted) {
            this.props.poll(this.pollIfMounted);
        }
    }

    isRemoteDataLoaded() {
        return Object.keys(this.state.packages).length !== 0
            && this.state.packages === Array;
    }

    hasFilteredResults() {
        return Object.keys(this.state.packages).length !== 0
            && this.state.packages.constructor === Array;
    }

    render() {
        let message = null,
            panels = [];

        if (this.state.packages.length == 0) {
            message = "Loading packages...";
        }

        else if (!this.hasFilteredResults()) {
            message = "No packages returned for the selected criteria.";
        }

        else {
            panels = this.state.packages.map((uploadPackage, index) => {
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
    filtering: PropTypes.object,
};

export default PackageList;
