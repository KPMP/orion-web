import React, { Component } from 'react';
import TextField from './TextField';
import DateField from './DateField';
import SelectBox from './SelectBox';
import { ControlLabel, Col, Row } from 'react-bootstrap';
import protocolList from './protocols';
import institutionList from './institutions';

class V1StyleForm extends Component {
	render() {
		
		const {
			values, touched, errors, handleChange, setFieldValue, handleBlur, handleSubmit
		} = this.props;
		return(
		    <div id="uploadInfo">
		    		<div className="header">
		    			Submitted by
		    		</div>
		        <Row>
		        		<Col md="4">
		        			<TextField name="submitterFirstName" label="First Name" onChange={handleChange} onBlur={handleBlur} value={values.submitterFirstName} touched={touched.submitterFirstName} error={errors.submitterFirstName}/>
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
		        			<TextField name="subjectId" label="Subject/Sample ID" onChange={handleChange} onBlur={handleBlur} value={values.subjectId} touched={touched.subjectId} error={errors.subjectId}/>
		        		</Col>
		        	</Row>
		        <Row>
		        		<Col md="4">
		        			<DateField name="experimentDate" label="Experiment Date (optional)" onChange={handleChange} onBlur={handleBlur} value={values.experimentDate} touched={touched.experimentDate} error={errors.experimentDate}/>
		        		</Col>
		        	</Row>
				<Row>
					<Col md="8">
						<ControlLabel>Description</ControlLabel>
						<div>
							<textarea name="description" type="text" />
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}


export default V1StyleForm;