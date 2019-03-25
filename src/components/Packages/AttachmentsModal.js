import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Col, Row } from 'reactstrap';
import filesize from 'filesize';
import { shouldColorRow } from './attachmentsModalRowHelper';
import PropTypes from 'prop-types';

class AttachmentsModal extends Component {
	
    render() {
    	console.log(this.props);
    	return (
			<div className="attachmentsModal static-modal">
				<Modal isOpen={this.props.show} onHide={this.props.close}>
					<ModalHeader toggle={this.props.close}>
	            		Attached Files
	            	</ModalHeader>
            		<ModalBody className="attachmentsModalBody">
            		{this.props.attachments.map((attachment, index) => {
            			let rowClass = "attachmentsModalRow";
            			if (shouldColorRow(index)) {
            				rowClass +=" grayRow";
            			}
            			return (<Row key={index} className={rowClass}>
            				<Col md={9} className="filename"><span>{attachment.fileName}</span></Col>
            				<Col md={3}>{filesize(attachment.size)}</Col>
            			</Row>);
            		})}
            		</ModalBody>
				</Modal>
			</div>
    	);
          
    }
}

AttachmentsModal.propTypes = {
    attachments: PropTypes.array.isRequired,
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
};

export default AttachmentsModal;
