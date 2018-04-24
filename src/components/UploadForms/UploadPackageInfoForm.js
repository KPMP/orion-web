import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormControl, ControlLabel } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';

class UploadPackageInfoForm extends Component {

    onSubmit = (data) => {
        this.props.uploadPackageInfo(data);
    };

    render() {
        const { handleSubmit } = this.props;
        console.log(this.props);
        return (
            <form onSubmit={handleSubmit(this.onSubmit)} name="uploadPackageInfoForm">
                <div className="modalTitle">Upload Information</div>
                <div>
                        <div>
                            <ControlLabel>First</ControlLabel>
                            <Field name="firstName" component={props => <FormControl  type={"text"}/>}/>
                        </div>
                        <div>
                            <ControlLabel>Last</ControlLabel>
                            <Field name="lastName" component={props => <FormControl  type={"text"}/>}/>
                        </div>
                        <div>

                            <ControlLabel>Site</ControlLabel>
                        <Field name="institutionName" component={props => <FormControl
                            componentClass={"select"}>
                            <option selected="" value="- select -">- select -</option>
                            <option value="Broad (Michigan/Broad/Princeton TIS)">Broad (Michigan/Broad/Princeton TIS)</option>
                            <option value="EMBL (UTHSA/EMBL/PNNL/UCSD TIS)">EMBL (UTHSA/EMBL/PNNL/UCSD TIS)</option>
                            <option value="Indiana (IU/OSU TIS)">Indiana (IU/OSU TIS)</option>
                            <option value="Michigan (Michigan/Broad/Princeton TIS)">Michigan (Michigan/Broad/Princeton TIS)</option>
                            <option value="OSU (IU/OSU TIS)">OSU (IU/OSU TIS)</option>
                            <option value="PNNL (UTHSA/EMBL/PNNL/UCSD TIS)">PNNL (UTHSA/EMBL/PNNL/UCSD TIS)</option>
                            <option value="Princeton (Michigan/Broad/Princeton TIS)">Princeton (Michigan/Broad/Princeton TIS)</option>
                            <option value="Stanford (UCSF/Stanford TIS)">Stanford (UCSF/Stanford TIS)</option>
                            <option value="UCSD (UCSD/WashU TIS)">UCSD (UCSD/WashU TIS)</option>
                            <option value="UCSD (UTHSA/EMBL/PNNL/UCSD TIS)">UCSD (UTHSA/EMBL/PNNL/UCSD TIS)</option>
                            <option value="UCSF (UCSF/Stanford TIS)">UCSF (UCSF/Stanford TIS)</option>
                            <option value="UTHSA (UTHSA/EMBL/PNNL/UCSD TIS)">UTHSA (UTHSA/EMBL/PNNL/UCSD TIS)</option>
                            <option value="WashU (UCSD/WashU TIS)">WashU (UCSD/WashU TIS)</option></FormControl>}/>

                            </div>
                                <div>
                            <ControlLabel>Package Type</ControlLabel>
                            <Field name="packageType" component={props => <FormControl
                                    componentClass={"select"}>
                                    <option selected="" value="- select -">- select -</option>
                                    <option value="Sub-segment RNAseq">Sub-segment RNAseq</option>
                                    <option value="Single-cell RNAseq">Single-cell RNAseq</option>
                                    <option value="Single-nucleus RNAseq">Single-nucleus RNAseq</option>
                                    <option value="Bulk RNAseq">Bulk RNAseq</option>
                                    <option value="DNA Methylation">DNA Methylation</option>
                                    <option value="Segmental miRNA">Segmental miRNA</option>
                                    <option value="Multiplex ISH">Multiplex ISH</option>
                                    <option value="Sub-segmental Proteomics">Sub-segmental Proteomics</option>
                                    <option value="Near-single-cell Proteomics">Near-single-cell Proteomics</option>
                                    <option value="3-D tissue imaging">3-D tissue imaging</option>
                                    <option value="Spatial Metabolomics">Spatial Metabolomics</option>
                                    <option value="Inflammatory Cells">Inflammatory Cells</option>
                                    <option value="Other">Other</option></FormControl>}/>
                        </div>
                        <div style={{textAlign: "center", fontWeight:"bold"}}>-OR-</div>
                        <div>
                            <ControlLabel>Subject # (optional)</ControlLabel>
                            <Field name="subjectId" component={props => <FormControl  type={"text"}/>}/>
                        </div>
                        <div>
                            <ControlLabel>Experiment # (optional)</ControlLabel>
                            <Field name="experimentId" component={props => <FormControl  type={"text"}/>}/>
                        </div>
                        <div>
                            <ControlLabel>Experiment Date (optional)</ControlLabel>
                            <Field name="experimentDate" component={props => <FormControl  type={"text"}/>}/>
                        </div>
                    </div>
                <div className="row buttonRow">
                    <div className="col-6 float-left">
                        <Button className="btn-outline-dark" onClick={() => this.props.showUploadModal(false)}>Cancel</Button>
                    </div>
                    <div className="col-6 float-right">
                        <Button bsStyle="primary" className="float-right" onClick={() => this.props.changeUploadTab(1)}>Next</Button>

                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'uploadPackageInfoForm'
})(UploadPackageInfoForm);
