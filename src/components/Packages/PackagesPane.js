import React, { Component } from 'react';
import FilterControl from './FilterControl';
import PackageListContainer from '../Packages/PackageListContainer';
import { Row, Col } from 'react-bootstrap';
import institutions from '../institutions';
import packageTypes from '../packageTypes';

class PackagesPane extends Component {
    render() {
        return (
    		<div className="pane">
    			<Row>
    				<Col xs="3" className="noLeftPadding">
    					<FilterControl placeholder="Filter by institution" options={institutions.options}/>
    				</Col>
    				<Col xs="3" className="noLeftPadding">
    					<FilterControl placeholder="Filter by package type" options={packageTypes.options}/>
    				</Col>
    				<Col xs="3" className="noLeftPadding">
    					<FilterControl placeholder="Filter by submitter" options={[{value: '1', label: 'one'}]} />
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