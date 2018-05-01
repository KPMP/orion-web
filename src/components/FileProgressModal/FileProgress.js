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
                                    <tr key={"a" + i}><td width="50%">&nbsp;<br/></td><td width="50%">{(row.size / 1000000).toFixed(2)} MB</td></tr>
                                    <tr key={"b" + i}><td width="50%">{row.name}</td>
                                        <td width="50%">
                                            {this.props.uploader && <ProgressBar id={row.id} uploader={this.props.uploader} />}
                                            {this.props.uploader && <Status id={row.id} uploader={this.props.uploader} text={ statusMessages }/> }
                                    </td></tr>
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