import React, { Component } from 'react';
import TextField from './TextField';
import TextArea from './TextArea';
import DateField from './DateField';
import SelectBox from './SelectBox';
import { Col, Row } from 'react-bootstrap';
import protocolList from '../../protocols';
import institutionList from '../../institutions';

class V1StyleForm extends Component {
	render() {

		let submitterFirstNameDisabled = this.props.userInformation.firstName !== "";
		let submitterLastNameDisabled = this.props.userInformation.lastName !== "";
		let submitterEmailDisabled = this.props.userInformation.email !== "";
		let dontNeedUserInfo = submitterFirstNameDisabled && submitterLastNameDisabled && submitterEmailDisabled;

		const {
			values, touched, errors, handleChange, setFieldValue, handleBlur
		} = this.props;
		
		return(
		    <div id="uploadInfo">
		    		<div className="header">
		    			Submitted by
		    		</div>
		        		{(dontNeedUserInfo) ?
		        			(	<Row>
									<Col md="8">{this.props.userInformation.firstName} {this.props.userInformation.lastName} ({this.props.userInformation.email}) </Col>
								</Row> ) :
			        		( <div>
								<Row>
									<div>
										<Col md="4">
											<TextField name="submitterFirstName" label="First Name" disabled={submitterFirstNameDisabled} onChange={handleChange} onBlur={handleBlur} value={values.submitterFirstName} touched={touched.submitterFirstName} error={errors.submitterFirstName} errors={errors}/>
										</Col>
										<Col md="4" className="secondField">
											<TextField name="submitterLastName" label="Last Name" disabled={submitterLastNameDisabled} onChange={handleChange} onBlur={handleBlur} value={values.submitterLastName} touched={touched.submitterLastName} error={errors.submitterLastName}/>
										</Col>
			        				</div>
								</Row>
								<Row>
									<Col md="4">
										<TextField name="submitterEmail" label="Email" disabled={submitterEmailDisabled} onChange={handleChange} onBlur={handleBlur} error={errors.submitterEmail} value={values.submitterEmail} touched={touched.submitterEmail} />
									</Col>
								</Row>
								</div>)
		        		}
		        <Row>
		        		<Col md="4">
		        			<SelectBox name="institution" label="Institution" options={institutionList.options} handleChange={handleChange} handleBlur={handleBlur} error={errors.institution} setFieldValue={setFieldValue}/>
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
		        			<SelectBox name="protocol" label="Associated Protocol" options={protocolList.options} handleChange={handleChange} handleBlur={handleBlur} error={errors.protocol} setFieldValue={setFieldValue}/>

		        		</Col>
		        		<Col md="4" className="secondField">
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