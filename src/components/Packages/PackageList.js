import React, { Component } from 'react';
import PackagePanel from './PackagePanel';

class PackageList extends Component {

    componentDidMount() {
        //this.props.getPackages();
        console.log('!!! DEBUG!  Disabled package loading');
    }

    render() {
        let isQuerying = this.props.packages.isQuerying === null || this.props.packages.isQuerying;
        let panels = [];

        if(!isQuerying) {
            panels = this.props.packages.filtered.map((uploadPackage, index) => {
                return <PackagePanel index={index} uploadPackage={uploadPackage}/>;
            });
        }

        return (
        	<div>
                {isQuerying ?

                    <div id="pkg-querying">
                        Loading packages...
                    </div>

                    :

                    panels.length > 0 ?
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