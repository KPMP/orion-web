import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class PackageSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: new Set(),
            filterOpen: false
        };
    }

    toggle = () => {
        this.setState({
            filterOpen: !this.state.filterOpen
        });
    }

    addFilter = (filter) => {
        this.setState({
            filters: new Set([...this.state.filters, filter]),
            filterOpen: false
        });
    }

    render() {
        const filters = this.state.filters;
        return (
            <Form inline id="pkg-search">
                {Array.from(filters)
                    .map(comp => {
                        return React.createElement(comp, { key: comp.toString()});
                    })}
            </Form>
        )
    }
}

export default PackageSearch;