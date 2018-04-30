import React, { Component } from 'react';
import ProgressBar from 'react-fine-uploader/progress-bar';


class FileProgress extends Component {

    render() {
        if (this.props.files.length) {
            return (
                <div className="fileProgress">
                    <table className="table table-sm fileProgress">
                        <thead>
                            <tr><th>Name</th><th>Progress</th></tr>
                        </thead>
                        <tbody>
                            {this.props.files.map((row, i) => {
                                return <tr key={i}><td>{row.name}</td><td>{this.props.uploader && <ProgressBar id={row.id} uploader={this.props.uploader}/>}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            )
        }

        return <p><em>No files to upload.</em></p>
    }
}

export default FileProgress