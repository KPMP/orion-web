import React, { Component } from 'react';
import { Select } from 'antd';

class FilterControl extends Component {
	
	constructor() {
		super();
		this.state = { selectedOption: undefined }
	}
	
	addFilter = (value) => {
		if (value === undefined) {
			this.clearFilter();
		} else {
			this.props.addFilter(this.props.type, value);
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
                    getPopupContainer={() => document.getElementById('packages-filter-controls')}>
				 {this.props.options.map(option => <Option key={option.value}>{option.label}</Option>)}
				</Select>
			</div>
		)
	}
}

export default FilterControl;