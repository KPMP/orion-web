import React, { Component } from 'react';
import { Form, Field, reduxForm } from 'redux-form';
import { Button, ControlLabel } from 'react-bootstrap';

class UploadModalPackageInfoForm extends Component {
    render() {
        const { handleSubmit, onSubmit } = this.props;
        return (
            <Form onSubmit={handleSubmit(onSubmit)} name="uploadPackageInfoForm">
                <div className="modalTitle" id="uploadInfoHeader">Upload Information</div>
                <span className="badge badge-danger">All fields are required unless otherwise noted</span>
                <div>
                    <div className="form-group">
                        <ControlLabel>First Name</ControlLabel>
                        <Field name="firstName" className="form-control" component="input" type="text" />
                    </div>
                    <div className="form-group">
                        <ControlLabel>Last Name</ControlLabel>
                        <Field name="lastName" className="form-control" component="input" type="text" />
                    </div>
                    <div className="form-group">
                        <ControlLabel>Site Name</ControlLabel>
                        <Field name="institutionName" className="form-control" component="select">
                            <option defaultValue="- select -">- select -</option>
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
                            <option value="WashU (UCSD/WashU TIS)">WashU (UCSD/WashU TIS)</option>
                        </Field>
                    </div>
                    <div className="form-group">
                        <ControlLabel>Package Type Name</ControlLabel>
                        <Field name="packageType" className="form-control" component="select">
                            <option defaultValue="- select -">- select -</option>
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
                            <option value="Other">Other</option>
                        </Field>
                    </div>
                    <div className="form-group">
                        <ControlLabel>Subject # (optional)</ControlLabel>
                        <Field name="subjectId" className="form-control" component="input" type="text" />
                    </div>
                    <div className="centerBold">-OR-</div>
                    <div className="form-group">
                        <ControlLabel>Experiment # (optional)</ControlLabel>
                        <Field name="experimentId" className="form-control" component="input" type="text" />
                    </div>
                    <div className="form-group">
                        <ControlLabel>Experiment Date (optional)</ControlLabel>
                        <Field name="experimentDate" className="form-control" component="input" type="date" />
                    </div>
                </div>
                <div className="row buttonRow">
                    <div className="col-6 float-left">
                        <Button className="btn-outline-dark" onClick={() => this.props.cancel()}>Cancel</Button>
                    </div>
                    <div className="col-6 float-right">
                        <Button bsStyle="primary" className="float-right" onClick={() => this.props.changeUploadTab(1)}>Next</Button>
                    </div>
                </div>
            </Form>
        );
    }
}

export default reduxForm({
    form: 'uploadPackageInfoForm'
})(UploadModalPackageInfoForm);
