import React, { Component } from 'react';
import FilterControl from './FilterControl';
import PackageListContainer from '../Packages/PackageListContainer';
import { Row, Col } from 'react-bootstrap';
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
    		<div className="pane">
    			<Row>
    				<Col xs="3" className="noLeftPadding">
    					<FilterControl placeholder="Filter by institution" options={institutions.options} type={filterActions.filterTypes.INSTITUTION} addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
    				</Col>
    				<Col xs="3" className="noLeftPadding">
    					<FilterControl placeholder="Filter by package type" options={packageTypes.options} type={filterActions.filterTypes.PACKAGE_TYPE} addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
    				</Col>
    				<Col xs="3" className="noLeftPadding">
    					<FilterControl placeholder="Filter by submitter" options={userOptions} type={filterActions.filterTypes.SUBMITTER} addFilter={this.props.addFilter} removeFilter={this.props.removeFilter}/>
    				</Col>
    			</Row>
    			<Row>
	                <i>Search results are displayed in reverse chronological order</i>
	                <PackageListContainer />
	            </Row>
            </div>
        );
    }
}

export default PackagesPane;