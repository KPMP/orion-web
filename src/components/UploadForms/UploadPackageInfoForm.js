import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormControl, ControlLabel } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';

class UploadPackageInfoForm extends Component {
    render() {
        const { handleSubmit, onSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(onSubmit)} name="uploadPackageInfoForm">
                <div>Upload Information</div>
                <div>
                        <div>
                            <ControlLabel>First</ControlLabel>
                            <Field name="firstName" className="form-control" component="input" type="text" />
                        </div>
                        <div>
                            <ControlLabel>Last</ControlLabel>
                            <Field name="lastName" className="form-control" component="input" type="text" />
                        </div>
                        <div>
                            <ControlLabel>Site</ControlLabel>
                            <Field name="institutionName" className="form-control" component="select">
                                <option />
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
                        <div>
                            <ControlLabel>Package Type</ControlLabel>
                            <Field name="packageType" className="form-control" component="input" type="text" />
                        </div>
                        <div style={{textAlign: "center", fontWeight:"bold"}}>-OR-</div>
                        <div>
                            <ControlLabel>Subject # (optional)</ControlLabel>
                            <Field name="subjectId" className="form-control" component="input" type="text" />
                        </div>
                        <div>
                            <ControlLabel>Experiment # (optional)</ControlLabel>
                            <Field name="experimentId" className="form-control" component="input" type="text" />
                        </div>
                        <div>
                            <ControlLabel>Experiment Date (optional)</ControlLabel>
                            <Field name="experimentDate" className="form-control" component="input" type="text" />
                        </div>
                    </div>
                <div className="row">
                    <div className="col-md-6 pull-left">
                        <Button bsStyle="default" onClick={() => this.props.cancel()}>Cancel</Button>
                    </div>
                    <div className="col-md-6 pull-right">
                        <Button bsStyle="primary">Next</Button>

                    </div>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'uploadPackageInfoForm'
})(UploadPackageInfoForm);
