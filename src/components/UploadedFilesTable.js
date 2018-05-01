import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';

class DateFormatter extends React.Component {

	render() {
		const formattedDate = this.props.value ? new Date(this.props.value).toLocaleDateString("en-US") : "";
		return (
			<div>
				<div>
          			{formattedDate}
				</div>
			</div>);
	}
}

class DateFormatterTime extends React.Component {

	render() {
		const formattedDate = this.props.value ? new Date(this.props.value).toLocaleString("en-US", { timeZone: 'UTC' }) : "";
		return (
			<div>
				<div>
          			{formattedDate}
				</div>
			</div>);
	}
}

class UploadedFilesTable extends Component {

	constructor(props) { 
		super();
		
		this._columns = [
		      { key: 'researcher', name: 'Name', resizable: true, sortable: true },
		      { key: 'institution', name: 'Site', resizable: true, sortable: true },
		      { key: 'packageType', name: 'Type', resizable: true, sortable: true },
		      { key: 'filename', name: 'File Name', resizable: true, sortable: true },
		      { key: 'subjectId', name:'Subject Id', resizable: true, sortable: true },
		      { key: 'experimentId', name:'Experiment Id', resizable: true, sortable: true },
		      { key: 'experimentDate', name: 'Experiment Date', formatter: DateFormatter, resizable: true, sortable: true},
			  { key: 'createdAt', name: 'Added On', formatter: DateFormatterTime, resizable: true, sortable: true} ];
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