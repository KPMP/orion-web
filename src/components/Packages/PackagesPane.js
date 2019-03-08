import React, { Component } from 'react';
import FilterControl from './FilterControl';
import PackageListContainer from '../Packages/PackageListContainer';
import { Button, Row, Col } from 'reactstrap';
import institutions from '../institutions';
import packageTypes from '../packageTypes';
import * as filterActions from '../../actions/filterActions';

class PackagesPane extends Component {
	
	usersToOptions = (users) => {
		let userOptions = [];
		users.map((user, index) => {
			let label = user.firstName + " " + user.lastName;
			return userOptions.push( {value: user.id, label: label});
		});
		return userOptions;
	}
	
    render() {
    	let userOptions = this.usersToOptions(this.props.users);
        return (
    		<article id="packages-pane" className="container">
    			<header id="packages-filter-controls" className="container-fluid fixed-top-subnav pt-3">
					<Row noGutters>
						<Col xs={12} md={"auto"} className="mx-sm-auto ml-md-0 mr-md-2">
							<FilterControl className="filter-control" placeholder="Filter by institution" options={institutions.options} type={filterActions.filterTypes.INSTITUTION} addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
						</Col>
                        <Col xs={12} md={"auto"} className="mx-sm-auto ml-md-0 mr-md-2">
                            <FilterControl className="filter-control" placeholder="Filter by package type" options={packageTypes.options} type={filterActions.filterTypes.PACKAGE_TYPE} addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
                        </Col>
                        <Col xs={12} md={"auto"} className="mx-sm-auto ml-md-0 mr-md-0">
                            <FilterControl className="filter-control" placeholder="Filter by submitter" options={userOptions} type={filterActions.filterTypes.SUBMITTER} addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
                        </Col>
						<Col xs={12} md={"auto"} className="mx-sm-auto ml-md-auto mr-md-0">
							<Button id="packages-button-add-new" color="primary" className="float-md-right btn-sm" disabled>Add new package</Button>
						</Col>
					</Row>
                    <Row>
						<Col xs={12}>
                        	<i class="text-secondary">Search results are displayed in reverse chronological order</i>
						</Col>
                    </Row>
    			</header>
				<Row>
                    <PackageListContainer />
				</Row>
            </article>
        );
    }
}

export default PackagesPane;
