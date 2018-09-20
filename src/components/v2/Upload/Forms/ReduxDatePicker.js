import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { change } from 'redux-form'
import { connect } from 'react-redux';
import Datetime from 'react-datetime';
import 'babel-polyfill';

/* Adapted from https://github.com/Hacker0x01/react-datepicker/issues/543#issuecomment-299767784 */

class ReduxDatePicker extends React.Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        value: PropTypes.string.isRequired,
        touched: PropTypes.bool,
        error: PropTypes.bool
    };

    constructor (props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Dispatches an event to the store to sync ReduxForm
     * state with UI state on invalid entries.
     * @param {*} param0 Destructured ReduxForm props
     * @param {*} date String to be converted to moment format.
     */
    handleChange ({meta, name}, date) {
    		console.log(date);
        if (typeof date === "object" || moment(date, ['YYYY-MM-DD', 'MM/DD/YYYY', 'MM-DD-YYYY'], true).isValid()) {
        		console.log("in if");
            const momentDate = moment(date);
            const formattedDate = momentDate.format('YYYY-MM-DD');
            return this.props.onChange(formattedDate);
        }
        else {
        		console.log("in else");
            return this.props.onChange(date);
        }

    }


    render () {
    		console.log(this.props);
    		const { name, value } = this.props;
        const handleChange = this.handleChange.bind(this, this.props);

        return (
            <div>
                <Datetime inputProps={ {placeholder: 'YYYY-MM-DD', name: name} } onChange={handleChange} closeOnSelect={true} value={value}/>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    change(form, field, value) {
        dispatch(change(form, field, value))
    }
})

export default connect(null, mapDispatchToProps)(ReduxDatePicker)