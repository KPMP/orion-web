import React, { Component } from 'react';
import PackagePanelContainer from './PackagePanelContainer';
import {Row} from 'reactstrap';
import PropTypes from 'prop-types';
import { applyFilters } from "./packagePanelReducer";
import { getPackagesStateless } from '../../actions/Packages/packageActions'

class PackageList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            packages: [],
            unfilteredPackages: []
        };
        this.pollIfMounted = this.pollIfMounted.bind(this);
    }

    async componentDidMount() {
        if(!this.isRemoteDataLoaded()) {
            await this.getPackages()
        }
        this._isMounted = true;
        this.pollIfMounted();
    }

    async getPackages() {
        let packages = await getPackagesStateless();
        this.props.setDtds(packages);
        this.setState({ packages: packages, unfilteredPackages: packages });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async componentDidUpdate(prevProps, prevState, snapShot) {
        if (this.props !== prevProps) {
            if (this.props.filtering !== prevProps.filtering) {
                this.setState({packages: applyFilters(this.props.filtering.filters, this.state.unfilteredPackages, this.props.filtering.packageTypes)});
            }
            if (this.props.refreshPackages) {
                await this.getPackages();
                this.props.setRefreshPackages(false)
            }
        }
    }

    pollIfMounted() {
        if(this._isMounted) {
            this.props.poll(this.pollIfMounted);
        }
    }

    isRemoteDataLoaded() {
        return Object.keys(this.state.unfilteredPackages).length !== 0
            && this.state.unfilteredPackages === Array;
    }

    hasNoFilteredResults() {
        return Object.keys(this.state.unfilteredPackages).length !== 0
            && this.state.packages.constructor === Array && Object.keys(this.state.packages).length === 0;
    }

    render() {
        let message = null,
            panels = [];

        if (this.state.unfilteredPackages.length === 0) {
            message = "Loading packages...";
        }

        else if (this.hasNoFilteredResults()) {
            message = "No packages returned for the selected criteria.";
        }

        else {
            panels = applyFilters(this.props.filtering.filters, this.state.unfilteredPackages, this.props.filtering.packageTypes).map((uploadPackage, index) => {
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
    setDtds: PropTypes.func,
    poll: PropTypes.func,
    setRefresh: PropTypes.func,
    formDTD: PropTypes.object,
    packageTypeIcons: PropTypes.array
};

export default PackageList;
