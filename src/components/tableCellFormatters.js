import React, { Component } from 'react';

export class DateFormatter extends React.Component {

    render() {
        const formattedDate = this.props.value ? new Date(this.props.value).toLocaleDateString("en-US") : "";
        return (
            <DefaultFormatter value={formattedDate} />
        );
    }
}

export class DateTimeFormatter extends React.Component {

    render() {
        const formattedDate = this.props.value ? new Date(this.props.value).toLocaleString("en-US", { timeZone: 'UTC' }) : "";
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