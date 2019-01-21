import React, { Component } from 'react';
import Select from 'react-select';

class FilterControl extends Component {
	
	
	render() {
		return (
				<Select options={this.props.options} placeholder={this.props.placeholder}/>
		)
	}
}

export default FilterControl;