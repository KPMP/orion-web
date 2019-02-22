import React, { Component } from 'react';
import { Form, Input } from 'antd';

class TextField extends Component {
	
	render() {
		return (
			<Form.Item label={this.props.label}>
				{this.props.getFieldDecorator(this.props.fieldName, this.props.fieldOptions)(
					<Input name={this.props.fieldName} />
				)}
			</Form.Item>
		);
		
	}
}

export default TextField;