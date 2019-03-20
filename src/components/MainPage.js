import React, { Component } from 'react';
import {panes} from './Nav/NavBar';
import NavBarContainer from './Nav/NavBarContainer';
import NavFooter from './Nav/NavFooter';
import PaneHolder from './PaneHolder'
import { getUserInformation } from '../actions/userActions';
import * as filterActions from '../actions/filterActions';
import { connect } from 'react-redux';
import ErrorBoundaryContainer from './Error/ErrorBoundaryContainer';
import { getFormDTD } from '../actions/Upload/uploadActions';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pane: panes.packages
        };
    }

    handlePaneSelect = (pane) => {
        this.setState({
            pane
        });
    }

    componentDidMount() {
        getUserInformation()(this.props.dispatch);
        filterActions.getUsers()(this.props.dispatch);
        getFormDTD()(this.props.dispatch);
    }

    render() {
        return (
            <ErrorBoundaryContainer>
                <NavBarContainer pane={this.state.pane} handlePaneSelect={this.handlePaneSelect} />
                <PaneHolder pane={this.state.pane} />
                <NavFooter/>
            </ErrorBoundaryContainer>
        );
    }
}

export default connect()(MainPage);