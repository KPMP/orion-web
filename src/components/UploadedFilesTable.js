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
		      { key: 'subjectId', name:'Subject Id', resizable: true, sortable: true, formatter: DefaultFormatter },
		      { key: 'experimentId', name:'Experiment Id', resizable: true, sortable: true, formatter: DefaultFormatter },
		      { key: 'experimentDate', name: 'Experiment Date', formatter: DateFormatter, resizable: true, sortable: true},
			  { key: 'createdAt', name: 'Added On', formatter: DateTimeFormatter, resizable: true, sortable: true} ];
		this.state = { rows: props.uploadedFiles };
	}
	  
	componentWillReceiveProps(nextProps) {
		this.setState({ rows: nextProps.uploadedFiles });
	}
	
	componentDidMount() {
		this.setState({ rows: this.props.uploadedFiles });
	}
	
	rowGetter = (i) => {
		return this.state.rows[i];
	};

	handleGridSort = (sortColumn, sortDirection) => {
		const comparer = (a, b) => {
			if (sortDirection === 'ASC') {
				return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
			} else if (sortDirection === 'DESC') {
				return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
			}
		};

		const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);

		this.setState({ rows });
	};

	render() {
		return(
			<div className="row">
				<div className="col-sm-12">
					<h5>Uploads</h5>
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