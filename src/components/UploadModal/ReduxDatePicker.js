import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { change } from 'redux-form'
import { connect } from 'react-redux';
import Datetime from 'react-datetime';

/* Adapted from https://github.com/Hacker0x01/react-datepicker/issues/543#issuecomment-299767784 */

class ReduxDatePicker extends React.Component {
    static propTypes = {
        input: PropTypes.shape({
            onChange: PropTypes.func.isRequired,
            value: PropTypes.string.isRequired,
        }).isRequired,
        meta: PropTypes.shape({
            touched: PropTypes.bool,
            error: PropTypes.bool,
        }),
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
    handleChange ({meta, input: {name}}, date) {
        if (typeof date === "object" || date.length === 10) {
            const momentDate = moment(date);
            if(!momentDate.isValid()) {
                return this.props.change(meta.form, name, '')
            }
            return this.props.input.onChange(momentDate.format('YYYY-MM-DD'));
        }
        else {
            return this.props.input.onChange(date);
        }

    }

    render () {
        const { input } = this.props;

        const handleChange = this.handleChange.bind(this, this.props);

        return (
            <div>
                <Datetime inputProps={ {placeholder: 'YYYY-MM-DD', name: input.name} } onChange={handleChange} closeOnSelect={true} value={input.value}/>
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