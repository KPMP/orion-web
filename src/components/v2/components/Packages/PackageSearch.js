import React, { Component } from 'react';
import FilterDropdown from './FilterDropdown';

class PackageSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: []
        };
    }

    addFilter = (filter) => {
        console.log(filter);
        this.setState({
            filters: [...this.state.filters, filter]
        });
    }

    render() {
        const filters = this.state.filters;
        return (
            <div id="pkg-search">
                <FilterDropdown addFilter={this.addFilter}/>
                {filters}
            </div>
        )
    }
}

export default PackageSearch;