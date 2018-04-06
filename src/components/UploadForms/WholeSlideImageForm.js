import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import FileDropzone from '../FileDropzone';

class WholeSlideImageForm extends Component {
	render() {
		return (
			<form>
				<div>
					<label>Institution</label>
					<Field name="institution" component="select">
						<option value="MSSM">MSSM</option>
						<option value="Princeton University">Princeton University</option>
						<option value="University of Indiana">University of Indiana</option>
						<option value="University of Michigan">University of Michigan</option>
						<option value="University of San Francisco">University of San Francisco</option>
						<option value="University of Washington">University of Washington</option>
						<option value="UTHSCS-SA">UTHSCS-SA</option>
						<option value="Washington University">Washington University</option>
						<option value="Other">Other</option>
					</Field>
				</div>
				<div>
					<label>Last Name</label>
					<Field name="lastName" component="input" type="text" placeholder="Last Name"/>
				</div>
				<div>
		        		<label>First Name</label>
	        			<Field name="firstName" component="input" type="text" placeholder="First Name"/>
		        	</div>
	        		<div><label>WSI File Format</label>
					<Field name="fileFormat" component="select">
						<option value="Aperio">Aperio / Leica SVS format</option>
						<option value="Phillips">Phillips iSyntax format</option>
						<option value="Zeiss">Zeiss Mirax format</option>
						<option value="multi-planar tiff">Multi-planar Tiff format</option>
						<option value="BigTiff">BigTiff format</option>
						<option value="jpg">JPG format</option>
						<option value="png">PNG format</option>
						<option value="other">Other format</option>
					</Field>
				</div>
				<div><label>Fixative</label>
					<Field name="fixative" component="select">
						<option value="bufferedFormalin">Buffered Formalin</option>
						<option value="ethanol">Ethanol</option>
						<option value="ethanol/acedic acid">Ethanol/Acetic Acid</option>
						<option value="gluteraldehyde">Gluteraldehyde</option>
						<option value="karnovsky">Karnovsky Fixative</option>
						<option value="paraformaldehyde">Paraformaldehyde</option>
						<option value="other">Other</option>
					</Field>
				</div>
				<div><label>Section Thickness</label>
					<Field name="sectionThickness" component="select">
						<option value="0.5">0.5 micron</option>
						<option value="1.0">1.0 micron</option>
						<option value="1.5">1.5 micron</option>
						<option value="2.0">2.0 micron</option>
						<option value="2.5">2.5 micron</option>
						<option value="3.0">3.0 micron</option>
						<option value="3.5">3.5 micron</option>
						<option value="4.0">4.0 micron</option>
						<option value="4.5">4.5 micron</option>
						<option value="5.0">5.0 micron</option>
						<option value="other">Other</option>
					</Field>
				</div>
				<div><label>Biopsy Type</label>
					<Field name="biopsyType" component="select">
						<option value="needle">Needle Biopsy</option>
						<option value="wedge/explanted">Wedge Biopsy (explanted organ)</option>
						<option value="wedge/partial">Wedge Biopsy (partial nephrectomy)</option>
						<option value="other">Other</option>
					</Field>
				</div>
				<div><label>Stain Type</label>
					<Field name="stainType" component="select">
						<option value="h&e">H&E</option>
						<option value="trichrome">Trichrome</option>
						<option value="jones">Jones</option>
						<option value="pas">PAS</option>
						<option value="pas/silver">PAS/Silver</option>
						<option value="reticulin">Reticulin</option>
						<option value="ipox">IPOX</option>
						<option value="other">Other</option>
					</Field>
				</div>
				<div><label>Scan Magnification</label>
					<Field name="scanMagnification" component="select">
						<option value="1">1x</option>
						<option value="2">2x</option>
						<option value="2.5">2.5x</option>
						<option value="4">4x</option>
						<option value="5">5x</option>
						<option value="8">8x</option>
						<option value="10">10x</option>
						<option value="20">20x</option>
						<option value="25">25x</option>
						<option value="40">40x</option>
						<option value="60">60x</option>
						<option value="63">63x</option>
						<option value="80">80x</option>
						<option value="100">100x</option>
						<option value="other">Other</option>
					</Field>
				</div>
				<div>
					<FileDropzone/>
				</div>
			</form>
		);
	}
}

export default reduxForm({
  form: 'wholeSlideImageForm', // a unique identifier for this form
})(WholeSlideImageForm);
