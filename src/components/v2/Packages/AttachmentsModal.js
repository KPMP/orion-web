import React, { Component } from 'react';
import { Modal, Col, Row } from 'react-bootstrap';
import filesize from 'filesize';
import { shouldColorRow } from './attachmentsModalRowHelper';

class AttachmentsModal extends Component {
	
    render() {
    		return (
            <div>
                <div className="attachmentsModal static-modal">
                    <Modal show={this.props.show} onHide={this.props.close}>
                    		<Modal.Header closeButton>
                    			<Modal.Title>Attached Files</Modal.Title>
                    		</Modal.Header>
                        <Modal.Body className="attachmentsModalBody">
                        {this.props.attachments.map((attachment, index) => {
                        		let rowClass = "attachmentsModalRow";
                        		if (shouldColorRow(index)) {
                        			rowClass +=" grayRow";
                        		}
                        		console.log(attachment.fileName);
                            return (<Row key={index} className={rowClass}>
                            		<Col md={9} className="filename"><span>{attachment.fileName}</span></Col>
                            		<Col md={3}>{filesize(attachment.size)}</Col>
                        		</Row>);
                        })}
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default AttachmentsModal;
