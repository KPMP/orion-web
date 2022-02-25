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
        console.log("get packages!")
        let packages = await getPackagesStateless();
        this.props.setDtds(packages);
        this.setState({ packages: packages, unfilteredPackages: packages });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async componentDidUpdate(prevProps, prevState, snapShot) {
        if (this.props.filtering !== prevProps.filtering) {
                this.setState({packages: applyFilters(this.props.filtering.filters, this.state.unfilteredPackages, this.props.filtering.packageTypes)});
            // if (this.props.filtering.refresh) {
            //     console.log("refresh!");
            //     await this.getPackages();
            //     this.props.setRefresh(false);
            // }
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

        if (this.state.packages.length === 0) {
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
    setDtds: PropTypes.func,
    poll: PropTypes.func,
    setRefresh: PropTypes.func,
    formDTD: PropTypes.object,
    packageTypeIcons: PropTypes.array
};

export default PackageList;
