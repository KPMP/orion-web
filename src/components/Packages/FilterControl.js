import React, { Component } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';

class FilterControl extends Component {
	
	constructor(props) {
		super(props);
		this.state = { selectedOption: this.props.defaultFilter || undefined }
	}
	
    componentDidMount() {
        if (this.props.defaultFilter) {
            // Convert {value, label} to {key, label} if needed
            const defaultOption = this.props.defaultFilter.value
                ? { key: this.props.defaultFilter.value, label: this.props.defaultFilter.label }
                : this.props.defaultFilter;
            this.addFilter(defaultOption);
        }
    }

    addFilter = (value) => {
        if (value === undefined || value === null) {
            this.clearFilter();
        } else {
            // Use value.key if present, otherwise value.value
            const filterValue = value.key || value.value;
            this.props.addFilter(this.props.type, filterValue);
            this.setState({ selectedOption: value });
        }
    }
	
	clearFilter = () => {
		this.setState({ selectedOption: undefined });
		this.props.removeFilter(this.props.type, this.state.selectedOption);
	}
	
	render() {
		const Option = Select.Option;
		return (
			<div className="filter">
				<Select
					allowClear showSearch
					placeholder={this.props.placeholder}
					onChange={this.addFilter}
					className={this.props.className}
					onSearch={this.handleSearch}
					labelInValue
                    value={this.state.selectedOption}
					filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    getPopupContainer={() => document.getElementById('packages-filter-controls')}>
				 {this.props.options.map(option => <Option key={option.value} value={option.value}>{option.label}</Option>)}
				</Select>
			</div>
		)
	}
}

FilterControl.propTypes = {
	addFilter: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
	className: PropTypes.string.isRequired,
	handleSearch: PropTypes.func,
	options: PropTypes.array.isRequired,
    defaultFilter: PropTypes.object
}


export default FilterControl;