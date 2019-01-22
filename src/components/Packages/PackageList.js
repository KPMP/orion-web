import React, { Component } from 'react';
import PackagePanel from './PackagePanel';

class PackageList extends Component {

    componentDidMount() {
        this.props.getPackages();
    }

    render() {
        const panels = this.props.packages.filtered.map((uploadPackage, index) => {
            return <PackagePanel index={index} uploadPackage={uploadPackage}/>;
        });
        return (
        	<div>
	    		{panels.length > 0 ?
	    			<div id="pkg-list">
	            		{panels}
	           		</div>
	            : 
	            	<div className="noResults alert alert-info">
	            		No packages returned for the selected criteria.
	            	</div>
	    		}
    		</div>
        );
    }
}

export default PackageList;