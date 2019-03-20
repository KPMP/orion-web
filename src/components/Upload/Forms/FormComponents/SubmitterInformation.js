import React, { Component } from 'react';
import { Col } from 'reactstrap';
import TextField from './TextField';

class SubmitterInformation extends Component {

	constructor(props) {
		super(props);

		this.state = {
            submitterFirstNameDisabled: false,
            submitterLastNameDisabled: false,
            submitterEmailDisabled: false,
            userInfoPopulated: false
        }
	}

	componentDidMount() {

		let userInfo = this.props.userInformation;

		let isDisabled = function(propName) {
			return userInfo.hasOwnProperty(propName)
				&& userInfo[propName] !== "";
		}

		let isEmptyObject = function(obj) {
            return Object.keys(obj).length === 0 && obj.constructor === Object;
		}

		let state = {
            submitterFirstNameDisabled: isDisabled("firstName"),
            submitterLastNameDisabled: isDisabled("lastName"),
            submitterEmailDisabled: isDisabled("email")
        };

		state.userInfoPopulated = !isEmptyObject(userInfo)
			&& state.submitterFirstNameDisabled && state.submitterLastNameDisabled && state.submitterEmailDisabled;

		this.setState(state);
	}

	render() {

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

		return (
			 <div className="row w-100 ml-0">
				<Col sm={12} md={6} lg={4}>
					<TextField label="First Name" fieldName="submitterFirstName" isDisabled={this.state.submitterLastNameDisabled} form={this.props.form} isRequired={true}/>
				</Col>
				<Col sm={12} md={6} lg={4} >
					<TextField label="Last Name" fieldName="submitterLastName" isDisabled={this.state.submitterLastNameDisabled} form={this.props.form} isRequired={true}/>
				</Col>
				<Col sm={12} md={6} lg={4}>
					<TextField label="Email" fieldName="submitterEmail" isDisabled={this.state.submitterEmailDisabled} form={this.props.form} isRequired={true}/>
				</Col>
			</div>
		);
	}
}

export default SubmitterInformation;