import React, { Component } from 'react';
import TextField from './TextField';
import TextArea from './TextArea';
import DateField from './DateField';
import SelectBox from './SelectBox';
import { Col, Row } from 'react-bootstrap';
import protocolList from './protocols';
import institutionList from './institutions';

class V1StyleForm extends Component {
	render() {
		
		const {
			values, touched, errors, handleChange, setFieldValue, handleBlur
		} = this.props;
		
		
		return(
		    <div id="uploadInfo">
		    		<div className="header">
		    			Submitted by
		    		</div>
		        <Row>
		        		{this.props.userInformation.firstName !== "" && this.props.userInformation.lastName !=="" &&
		        			<Col md="4">{this.props.userInformation.firstName} {this.props.userInformation.lastName}</Col>
		        		}
		        		<Col md="4">
		        			<TextField name="submitterFirstName" label="First Name" onChange={handleChange} onBlur={handleBlur} value={values.submitterFirstName} touched={touched.submitterFirstName} error={errors.submitterFirstName} errors={errors}/>
		        		</Col>
		        		<Col md="4" >
		        			<TextField name="submitterLastName" label="Last Name" onChange={handleChange} onBlur={handleBlur} value={values.submitterLastName} touched={touched.submitterLastName} error={errors.submitterLastName}/>
		        		</Col>
		        </Row>
		        <Row>
		        		<Col md="4">
		        			<SelectBox name="institution" label="Site Name" options={institutionList.institutions} handleChange={handleChange} handleBlur={handleBlur} error={errors.institution} setFieldValue={setFieldValue}/>
		        		</Col>
		        	</Row>
		        	<Row>
		        		<Col md="12">
				        	<div className="header" id="packageInformationSection">
				        		Package Information
				        	</div>
			        	</Col>
		        	</Row>
		        <Row >
		        		<Col md="4">
		        			<SelectBox name="protocol" label="Associated Protocol" options={protocolList.protocols} handleChange={handleChange} handleBlur={handleBlur} error={errors.protocol} setFieldValue={setFieldValue}/>

		        		</Col>
		        		<Col md="4">
		        			<TextField name="subjectId" label="Subject/Sample ID" onChange={handleChange} onBlur={handleBlur} value={values.subjectId} touched={touched.subjectId} error={errors.subjectId} placeholder="Enter subject or sample ID"/>
		        		</Col>
		        	</Row>
		        <Row>
		        		<Col md="4">
		        			<DateField name="experimentDate" label="Experiment Date (optional)" onChange={handleChange} onBlur={handleBlur} value={values.experimentDate} touched={touched.experimentDate} error={errors.experimentDate} setFieldValue={setFieldValue}/>
		        		</Col>
		        	</Row>
				<Row>
					<Col md="8">
						<TextArea label="Description" name="description" type="text" onChange={handleChange} onBlur={handleBlur} value={values.description} placeholder="Describe the contents of this package" touched={touched.description} error={errors.description}/>
					</Col>
				</Row>
			</div>
		);
	}
}


export default V1StyleForm;