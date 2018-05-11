import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import {DefaultFormatter, DateFormatter, DateTimeFormatter} from './tableCellFormatters';

class UploadedFilesTable extends Component {

	constructor(props) { 
		super();
		
		this._columns = [
		      { key: 'researcher', name: 'Name', resizable: true, sortable: true, formatter: DefaultFormatter },
		      { key: 'institution', name: 'Site', resizable: true, sortable: true, formatter: DefaultFormatter },
		      { key: 'packageType', name: 'Type', resizable: true, sortable: true, formatter: DefaultFormatter },
		      { key: 'filename', name: 'File Name', resizable: true, sortable: true, formatter: DefaultFormatter },
		      { key: 'subjectId', name:'Subject #', resizable: true, sortable: true, formatter: DefaultFormatter },
		      { key: 'experimentId', name:'Experiment #', resizable: true, sortable: true, formatter: DefaultFormatter },
		      { key: 'experimentDate', name: 'Experiment Date', formatter: DateFormatter, resizable: true, sortable: true},
			  { key: 'createdAt', name: 'Added On', formatter: DateTimeFormatter, resizable: true, sortable: true} ];

		let rows = props.uploadedFiles;
		this.state = { rows };
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ rows: nextProps.uploadedFiles.slice(0) });
	}

	componentDidMount() {
		this.setState({ rows: this.props.uploadedFiles.slice(0) });
	}
	
	rowGetter = (i) => {
		return this.state.rows[i];
	};

	handleGridSort = (sortColumn, sortDirection) => {
		const comparer = (a, b) => {

			const value1 = a[sortColumn];
			const value2 = b[sortColumn];

			if (value1 === null || value2 === "") {
				return 1;
			}
			else if (value2 === null || value1 === "") {
				return -1;
			}
			else if (value1 === value2) {
				return 0;
			}

			if (sortDirection === 'ASC') {
				if (isNaN(value1)) {
					return value1.toString().toLowerCase().localeCompare(value2.toString().toLowerCase());
				}
				else {
					return value1 - value2;
				}
			}
			else {
				if (isNaN(value1)) {
					return value2.toString().toLowerCase().localeCompare(value1.toString().toLowerCase());
				}
				else {
					return value2 - value1;
				}
			}
		};

		const rows = sortDirection === 'NONE' ? this.props.uploadedFiles.slice(0) : this.state.rows.sort(comparer);

		this.setState({ rows });
	};

	render() {
		return(
			<div className="row">
				<div className="col-sm-12">
					<h4>Uploads</h4>
					<div className="uploadTable">
						{ this.state.rows.length ? <ReactDataGrid
							columns={this._columns}
							rowGetter={this.rowGetter}
							rowsCount={this.state.rows.length}
							onGridSort={this.handleGridSort}
							minHeight={500} /> : '' }
					</div>		
				</div>
			</div>
		);
	}
}



export default UploadedFilesTable;