import React, { Component } from 'react'

class FileList extends Component {

    render() {
        let fileList = this.props.files.map((file, i) => {
            return <tr key={i}><td>{file.fileName}</td><td>{file.description}</td></tr>
        });
        return (
            <table>
                <thead>
                    <tr><th>Name</th><th>Description</th></tr>
                </thead>
                <tbody>
                    {fileList}
                </tbody>
            </table>
        )
    }
}

export default FileList