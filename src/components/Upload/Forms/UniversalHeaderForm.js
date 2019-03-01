import { Component } from 'react';
import { Form } from 'antd';
import DTD from '../../dynamicFormsDTD';
import { DynamicFormGenerator } from './dynamicFormGenerator';

class UniversalHeaderForm extends Component {
	
	constructor(props) {
		super(props);
		let formGenerator = new DynamicFormGenerator();
		this.renderSection = formGenerator.renderSection.bind(this);
		this.renderField = formGenerator.renderField.bind(this);
	}
	
	render() {
		return this.renderSection(DTD.standardFields, this.props.form, this.props.userInformation);
	}
	
}

const WrappedUniversalHeaderForm = Form.create({ name: 'universalHeader', validateMessage: "Required" })(UniversalHeaderForm);

export default WrappedUniversalHeaderForm;