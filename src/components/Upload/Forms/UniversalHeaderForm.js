import { Component } from 'react';
import { Form } from 'antd';
import DTD from '../../dynamicFormsDTD';
import { renderSection, renderField } from './dynamicFormGenerator';

class UniversalHeaderForm extends Component {
	
	constructor(props) {
		super(props);
		
		this.renderSection = renderSection.bind(this);
		this.renderField = renderField.bind(this);
	}
	
	render() {
		return this.renderSection(DTD.standardFields, this.props.form, this.props.userInformation);
	}
	
}

const WrappedUniversalHeaderForm = Form.create({ name: 'universalHeader', validateMessage: "Required" })(UniversalHeaderForm);

export default WrappedUniversalHeaderForm;