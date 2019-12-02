import React, { Component } from 'react';
import { Popover, PopoverBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const POPOVER_CLASSES = {
    classNames: '',
    innerClassNames: 'rounded p-2 small text-sm-left'
};

const PANEL_CONFIGS = {
    FILES_RECEIVED: {
        text: 'Finishing upload',
        classNames: 'alert-success',
        message: 'The file(s) in this package are being finalized.  Once completed, they will be available for download.'
    },

    METADATA_RECEIVED: {
        text: 'Waiting for files...',
        classNames: 'alert-primary',
        icon: { type: faClock, isProtected: true },
        myLargeFileUploadMessage: 'Awaiting file(s) to be uploaded. Click the clock icon for upload instructions.',
        notMyLargeFileUploadMessage: 'Awaiting file(s) to be uploaded.',
        standardMessage: 'Waiting for file(s) to finish uploading.'
    },
    
    UPLOAD_FAILED: {
    	text: 'Upload failed',
    	classNames: 'alert-danger',
    	message: <div>
					<div>The file(s) in this package could not be processed. It is recommended that you re-upload this package.</div>
					<br/>
					<div>For more information please contact KPMP support at <a target='_blank' rel='noopener noreferrer' href='mailto:datalakeuploadersupport@kpmp.org'>datalakeuploadersupport@kpmp.org</a></div>
				</div>
    		
    }
};

class PackagePanelStateText extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.isMine = this.isMine.bind(this);
        this.getIcon = this.getIcon.bind(this);
        this.setMessage = this.setMessage.bind(this);
        this.configurePanelOptions = this.configurePanelOptions.bind(this);
        this.state = {
            popoverOpen: false
        };
    }

    toggle() {
        this.setState({
        	popoverOpen: !this.state.popoverOpen
        });
    }

    getIcon() {
    	let panelConfig = PANEL_CONFIGS[this.props.panelState.state];
    	if ((panelConfig.icon.isProtected && this.isMine()) || !panelConfig.icon.isProtected) {
       		return panelConfig.icon.type;
    	} 
    }
   
    isMine() {
    	return this.props.currentUser.shibId === this.props.packageSubmitter.shibId;
    }
    
    configurePanelOptions() {
    	let baseConfig = PANEL_CONFIGS[this.props.panelState.state];
    	let panelConfig = { message: baseConfig.standardMessage };
    	this.setMessage(panelConfig, baseConfig);
    	panelConfig.text = baseConfig.text;
    	panelConfig.classNames = baseConfig.classNames;
    	if (baseConfig.icon && this.props.handleStateInfoClick) {
    		panelConfig.icon = this.getIcon();
    	}
    	return panelConfig;
    }
    
    setMessage(panelConfig, baseConfig) {
    	if (this.props.largeFileUpload && this.props.panelState.state === 'METADATA_RECEIVED' && this.isMine()) {
    		panelConfig.message = baseConfig.myLargeFileUploadMessage;
    	} else if ( this.props.largeFileUpload && this.props.panelState.state === "METADATA_RECEIVED" && !this.isMine()){
    		panelConfig.message = baseConfig.notMyLargeFileUploadMessage;
    	}
    }
    
    render() {
    	let panelConfig = this.configurePanelOptions();

        if(panelConfig === undefined) {
            return null;
        }

        let popoverTargetId = 'popover-' + this.props.panelState.packageId;

        return <React.Fragment>
            <div className='d-flex align-items-start'>
                <div className='w-75'>
                    <div className={'mr-2 my-0 px-2 py-1 alert clickable text-dark ' + panelConfig.classNames} id={popoverTargetId} >
                        <span>{panelConfig.text}</span>
                    </div>
                    { panelConfig.message &&
                        <span>
                            <Popover className={POPOVER_CLASSES.classNames}
                                     innerClassName={POPOVER_CLASSES.innerClassNames}
                                     placement={'bottom'}
                                     delay={{'hide': 300}}
                                     isOpen={this.state.popoverOpen}
                                     toggle={this.toggle}
                                     target={popoverTargetId}
                            		 html={true}
                            		 trigger={'hover'}>
                                <PopoverBody>{panelConfig.message}</PopoverBody>
                            </Popover>
                        </span>
                    }
                </div>
                { panelConfig.icon && 
                	<span onClick={this.props.handleStateInfoClick}>
                        <div className='additional-icon clickable'><FontAwesomeIcon className='float-right' icon={panelConfig.icon} size='lg' inverse/></div>
                    </span>
                }
            </div>
        </React.Fragment>;
    }
}

PackagePanelStateText.propTypes = {
    panelState: PropTypes.object.isRequired,
    handleStateInfoClick: PropTypes.func
};

export default PackagePanelStateText;