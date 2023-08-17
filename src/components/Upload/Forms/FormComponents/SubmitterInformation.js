import React, { Component } from 'react';
import { Col } from 'reactstrap';
import TextField from './TextField';
import PropTypes from 'prop-types';

const FIRST_NAME = "firstName";
const LAST_NAME = "lastName";
const EMAIL = "email";
class SubmitterInformation extends Component {

	constructor(props) {
		super(props);
		this.state = {
			submitterFirstNameDisabled: this.isFieldDisabled(FIRST_NAME, props),
            submitterLastNameDisabled: this.isFieldDisabled(LAST_NAME, props),
            submitterEmailDisabled: this.isFieldDisabled(EMAIL, props),
            userInfoPopulated: this.isUserInfoPopulated(props)
		};
    this.formRef = React.useForm(null);
	}

	isFieldDisabled(fieldName, props) {
        return props.userInformation.hasOwnProperty(fieldName)
            && props.userInformation[fieldName] !== "";
	}

	isUserInfoPopulated(props) {
		return this.isFieldDisabled(FIRST_NAME, props)
            && this.isFieldDisabled(LAST_NAME, props)
            && this.isFieldDisabled(EMAIL, props)
	}

	render() {
        ;
        if (this.state.userInfoPopulated) {
            return (
                <Col sm={12} md={12} lg={12} className="ant-form-item submitterInfo">
                    <div className="ant-form-item-label">
                        <label>Submitted By</label>
                    </div>
                    <div className="submitterInfoValues">
                        {this.props.userInformation.firstName} {this.props.userInformation.lastName} ({this.props.userInformation.email})
                    </div>
                </Col>
            );
        }

        else {
            return (
                <div className="row w-100 ml-0">
                    <Col sm={12} md={6} lg={4}>
                        <TextField label="First Name" fieldName="submitterFirstName"
                                   isDisabled={this.state.submitterLastNameDisabled} form={this.formRef}
                                   isRequired={true}/>
                    </Col>
                    <Col sm={12} md={6} lg={4}>
                        <TextField label="Last Name" fieldName="submitterLastName"
                                   isDisabled={this.state.submitterLastNameDisabled} form={this.formRef}
                                   isRequired={true}/>
                    </Col>
                    <Col sm={12} md={6} lg={4}>
                        <TextField label="Email" fieldName="submitterEmail"
                                   isDisabled={this.state.submitterEmailDisabled} form={this.formRef}
                                   isRequired={true}/>
                    </Col>
                </div>
            );
        }
	}
}

SubmitterInformation.propTypes = {
    // form: PropTypes.object.isRequired,
    userInformation: PropTypes.object
}

export default SubmitterInformation;