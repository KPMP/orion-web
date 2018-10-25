import React, { Component } from 'react';
import PackageListContainer from '../Packages/PackageListContainer';
import { Row } from 'react-bootstrap';

class PackagesPane extends Component {
    render() {
        return (
        		<div className="pane">
        			<Row>
	                <i>Search results are displayed in reverse chronological order</i>
	                <PackageListContainer />
	            </Row>
            </div>
        );
    }
}

export default PackagesPane;