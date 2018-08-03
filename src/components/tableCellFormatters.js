import React from 'react';
import moment from 'moment';

export class DateFormatter extends React.Component {

    render() {
        const formattedDate = this.props.value ? moment.utc(this.props.value).format('YYYY-MM-DD') : "";
        return (
            <DefaultFormatter value={formattedDate} />
        );
    }
}

export class DateTimeFormatter extends React.Component {
    render() {
        const formattedDate = this.props.value ? moment.utc(this.props.value).format('YYYY-MM-DD, h:mm:ss A') : "";
        return (
            <DefaultFormatter value={formattedDate} />
        );
    }
}

export class DefaultFormatter extends React.Component {

    render() {
        return (
            <div>
                <div className="uploadCell">
                    <span title={this.props.value}>{this.props.value}</span>
                </div>
            </div>);
    }
}

export class DownloadFormatter extends React.Component {
	render () {
		return (
			<div><i class="fa fa-download" aria-hidden="true"></i></div>
		)
	}
}