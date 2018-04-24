import React, { Component } from 'react'

class FileList extends Component {

    render() {
        if (this.props.files.length) {
            return (
                <table>
                    <thead>
                        <tr><th>Name</th><th>Description</th></tr>
                    </thead>
                    <tbody>
                        {this.props.files.map((row, i) => {
                            return <tr key={i}><td>{row.name}</td><td>{row.description}</td></tr>
                        })}
                    </tbody>
                </table>
            )
        }

        return <p><em>No files attached.</em></p>        
    }
}

export default FileList