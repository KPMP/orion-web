import React, { Component } from 'react';
import { Form, Input } from 'antd';

class TextField extends Component {
	
	render() {
		let isDisabled = this.props.isDisabled || false;
		
		return (
			<Form.Item label={this.props.label}>
				{this.props.getFieldDecorator(this.props.fieldName, this.props.fieldOptions)(
					<Input name={this.props.fieldName} disabled={isDisabled}/>
				)}
			</Form.Item>
		);
		
	}
}

export default TextField;