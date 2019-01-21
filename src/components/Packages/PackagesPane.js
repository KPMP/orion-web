import React, { Component } from 'react';
import FilterControl from './FilterControl';
import PackageListContainer from '../Packages/PackageListContainer';
import { Row, Col } from 'react-bootstrap';
import institutions from '../institutions';
import packageTypes from '../packageTypes';
import * as filterActions from '../../actions/filterActions';

class PackagesPane extends Component {
    render() {
        return (
    		<div className="pane">
    			<Row>
    				<Col xs="3" className="noLeftPadding">
    					<FilterControl placeholder="Filter by institution" options={institutions.options} type={filterActions.filterTypes.INSTITUTION} onChange={this.props.addFilter}/>
    				</Col>
    				<Col xs="3" className="noLeftPadding">
    					<FilterControl placeholder="Filter by package type" options={packageTypes.options} type={filterActions.filterTypes.PACKAGE_TYPE} onChange={this.props.addFilter}/>
    				</Col>
    				<Col xs="3" className="noLeftPadding">
    					<FilterControl placeholder="Filter by submitter" options={[{value: '1', label: 'one'}]} type={filterActions.filterTypes.SUBMITTER} onChange={this.props.addFilter}/>
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