import React, { Component } from 'react';
import FilterControl from './FilterControl';
import PackageListContainer from '../Packages/PackageListContainer';
import { Row, Col } from 'reactstrap';
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
    			<Row id="packages-filter-controls">
    				<Col xs={12} >
    					<div>
    						<FilterControl className="filter-control" placeholder="Filter by institution" options={institutions.options} type={filterActions.filterTypes.INSTITUTION} addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
    						<FilterControl className="filter-control" placeholder="Filter by package type" options={packageTypes.options} type={filterActions.filterTypes.PACKAGE_TYPE} addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
    						<FilterControl className="filter-control" placeholder="Filter by submitter" options={userOptions} type={filterActions.filterTypes.SUBMITTER} addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
    					</div>
    				</Col>
    			</Row>
    			<Row>
	                <i class="text-secondary">Search results are displayed in reverse chronological order</i>
	                <PackageListContainer />
	            </Row>
            </article>
        );
    }
}

export default PackagesPane;