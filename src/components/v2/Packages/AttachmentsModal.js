import React, { Component } from 'react';
import { Modal, Col, Row } from 'react-bootstrap';
import filesize from 'filesize';

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
                        		if (((index + 1) % 2) === 0) {
                        			rowClass +=" grayRow";
                        		}
                            return (<Row key={index} className={rowClass}>
                            		<Col md={10}>{attachment.fileName}</Col>
                            		<Col md={2}>{filesize(attachment.size)}</Col>
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
