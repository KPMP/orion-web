import React, { Component } from 'react';
import { Form, Field, reduxForm } from 'redux-form';
import {  ControlLabel } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class UploadModalPackageInfoForm extends Component {
    render() {
        const { handleSubmit, onSubmit } = this.props;
        const renderField = ({
        	  input,
        	  label,
        	  type,
        	  meta: { touched, error, warning }
        	}) => (
        	  <div>
        	    <label>{label}</label>
        	    <div>
        	      <input {...input} placeholder={label} type={type} />
        	      {touched &&
        	        ((error && <span>{error}</span>) ||
        	          (warning && <span>{warning}</span>))}
        	    </div>
        	  </div>
        	);
        return (
        		<form onSubmit={onSubmit} name="uploadPackageInfoForm">
        			<Field name="firstName" validate={() => 'Required'} component={renderField} className='form-control' type="text" />
        		</form>
            
        );
    }
}

export default reduxForm({
    form: 'uploadPackageInfoForm'
})(UploadModalPackageInfoForm);
