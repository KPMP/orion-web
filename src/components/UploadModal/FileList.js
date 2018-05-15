import React, { Component } from 'react';

class FileList extends Component {

	removeFile(index) {
		this.props.removeFile(index);
	}
	
	createRow(row, index) {
		if (this.props.allowDelete) {
			return (
            		<tr key={index}>
            			<td>{row.name}</td>
            			<td>{row.fileMetadata}</td>
            			<td><div className="glyphicon glyphicon-remove" onClick={() => this.removeFile(index)}/> </td>
            		</tr>
            	);
		} else {
			return (
            		<tr key={index}>
            			<td>{row.name}</td>
            			<td>{row.fileMetadata}</td>
            		</tr>
            	);
		}
	}
	
    render() {
        if (this.props.files.length) {
            return (
                <div className="fileList">
                    <table className="table table-sm">
                        <thead>
                            <tr><th>Name</th><th>Description</th><th></th></tr>
                        </thead>
                        <tbody>
                            {this.props.files.map((row, index) => {
                                return this.createRow(row, index);
                            })}
                        </tbody>
                    </table>
                </div>
            )
        }

        return <div className="fileList"><p><em>No files attached.</em></p></div>        
    }
}

export default FileList