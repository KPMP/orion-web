import React from 'react';
import ReactGA from 'react-ga';
import moment from 'moment';
import Api from '../helpers/Api';
import { getLocalDateString, getLocalTimeString } from '../helpers/timezoneUtil'
const api = Api.getInstance();

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
        const formattedDate = getLocalDateString(this.props.value) + " " + getLocalTimeString(this.props.value);
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

    downloadClickAction = () => {
        ReactGA.event({
            category: 'Download',
            action: 'File Package',
            value: this.props.dependentValues.databaseId
        });
    }

	render () {
		if (this.props.dependentValues.downloadable) {
			return (
					<div onClick={this.downloadClickAction}><a href={"/api/download/" + this.props.dependentValues.databaseId}><i class="fa fa-download" aria-hidden="true"></i></a></div>
			)
		} else {
			return (<div>&nbsp;</div>);
		}
	}
}