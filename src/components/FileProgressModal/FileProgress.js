import React, { Component } from 'react';
import ProgressBar from 'react-fine-uploader/progress-bar';
import Status from 'react-fine-uploader/status';

class FileProgress extends Component {

    render() {
        const statusMessages = {
            canceled: 'Canceled',
            deleting: 'Deleting...',
            paused: 'Paused',
            queued: 'Queued',
            retrying_upload: 'Retrying...',
            submitting: 'Submitting...',
            uploading: '',
            upload_failed: 'Failed',
            upload_successful: 'Completed'
        };
        if (this.props.files.length) {
            return (
                <div>
                    <table id="fileProgressTable">
                            {this.props.files.map((row, i) => {
                                return (
                                <tbody>
                                    <tr key={i}>
                                        <td width="45%" className="fileNameCell">{row.name}</td>
                                        <td width="45%" className="fileProgressCell">
                                            {this.props.uploader && <ProgressBar id={row.id} uploader={this.props.uploader} />}
                                            {this.props.uploader && <Status id={i} uploader={this.props.uploader} text={ statusMessages }/> }
                                        </td>
                                        <td width="10%" className="fileSizeCell">
                                            {(row.size / 1000000).toFixed(2)} MB
                                        </td>
                                    </tr>
                                </tbody>
                                    )
                            })}
                    </table>
                </div>
            )
        }

        return <p><em>No files to upload.</em></p>
    }
}

export default FileProgress