import React, { Component } from 'react';
import { Select } from 'antd';

class FilterControl extends Component {
	
	constructor() {
		super();
		this.state = { selectedOption: null }
	}
	
	addFilter = (value) => {
		this.props.addFilter(this.props.type, value.value);
		this.setState({selectedOption: value});
	}
	
	clearFilter = () => {
		this.props.removeFilter(this.props.type, this.state.selectedOption.value);
		this.setState({ selectedOption: null });
	}
	
	render() {
		const Option = Select.Option;
		return (
			<div className="filter">
				<Select showSearch placeholder={this.props.placeholder} onChange={this.addFilter} className={this.props.className}>
				 {this.props.options.map(option => <Option key={option.value}>{option.label}</Option>)}
				</Select><br/>
				{ this.state.selectedOption !== null ? <span className="clearFilter" onClick={this.clearFilter}>Clear</span> : <span className="clearFilter">&nbsp;</span>}
			</div>
		)
	}
}

export default FilterControl;