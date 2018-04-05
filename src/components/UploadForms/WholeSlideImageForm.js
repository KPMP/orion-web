import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class WholeSlideImageForm extends Component {
	render() {
		return (
			<form>
				<div><label>Institution</label>
					<div>
						<Field name="institution" component="select">
							<option value="University of Michigan">University of Michigan</option>
							<option value="University of Washington">University of Washington</option>
						</Field>
					</div>
				</div>
				<div>
					<label>Last Name</label>
					<div>
						<Field name="lastName" component="input" type="text" placeholder="Last Name"/>
					</div>
				</div>
				<div>
		        		<label>First Name</label>
		        		<div>
		        			<Field name="firstName" component="input" type="text" placeholder="First Name"/>
		        		</div>
		        	</div>
	        		<div><label>WSI File Format</label>
	        			<div>
						<Field name="fileFormat" component="select">
							<option value="svs">Aperio / Leica SVS format</option>
							<option value="other">Other</option>
						</Field>
					</div>
				</div>
				<div><label>Fixative</label>
		    			<div>
						<Field name="fixative" component="select">
							<option value="bufferedFormalin">Buffered Formalin</option>
							<option value="frozen">Frozen</option>
							<option value="fresh">Fresh</option>
						</Field>
					</div>
				</div>
				<div><label>Section Thickness</label>
					<div>
						<Field name="sectionThickness" component="select">
							<option value="4.5">4.5 micron</option>
							<option value="5">5 micron</option>
							<option value="8">8 micron</option>
						</Field>
					</div>
				</div>
				<div><label>Biopsy Type</label>
					<div>
						<Field name="biopsyType" component="select">
							<option value="needle">Needle Biopsy</option>
							<option value="surgical">Surgical Biopsy</option>
						</Field>
					</div>
				</div>
				<div><label>Stain Type</label>
					<div>
						<Field name="stainType" component="select">
							<option value="h&e">H&E</option>
							<option value="red wine">Red Wine</option>
						</Field>
					</div>
				</div>
				<div><label>Scan Magnification</label>
					<div>
						<Field name="scanMagnification" component="select">
							<option value="40">40x</option>
							<option value="30">30x</option>
							<option value="10">10x</option>
						</Field>
					</div>
				</div>
			</form>
		);
	}
}

export default reduxForm({
  form: 'wholeSlideImageForm', // a unique identifier for this form
})(WholeSlideImageForm);