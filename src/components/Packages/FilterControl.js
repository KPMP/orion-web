import React, { Component } from 'react';
import { Select } from 'antd';
import PropTypes from 'prop-types';

class FilterControl extends Component {
	
	constructor() {
		super();
		this.state = { selectedOption: undefined }
	}
	
	addFilter = (value) => {
		if (value === undefined) {
			this.clearFilter();
		} else {
			this.props.addFilter(this.props.type, value.key);
			this.setState({selectedOption: value});
		}
	}
	
	clearFilter = () => {
		this.props.removeFilter(this.props.type, this.state.selectedOption);
		this.setState({ selectedOption: null });
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
					filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    getPopupContainer={() => document.getElementById('packages-filter-controls')}>
				 {this.props.options.map(option => <Option value={option.value}>{option.label}</Option>)}
				</Select>
			</div>
		)
	}
}

FilterControl.propTypes = {
	addFilter: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
	className: PropTypes.string.isRequired,
	handleSearch: PropTypes.func.isRequired,
	options: PropTypes.array.isRequired
}


export default FilterControl;