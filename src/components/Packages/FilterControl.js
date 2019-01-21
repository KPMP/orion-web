import React, { Component } from 'react';
import Select from 'react-select';

class FilterControl extends Component {
	
	addFilter = (value) => {
		this.props.onChange(this.props.type, value.value);
	}
	
	render() {
		return (
			<Select options={this.props.options} placeholder={this.props.placeholder} onChange={this.addFilter}/>
		)
	}
}

export default FilterControl;