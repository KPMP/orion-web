import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import {store} from '../../App'
import {change} from 'redux-form'

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
        placeholder: PropTypes.string,
    };

    static defaultProps = {
        placeholder: ''
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
        const momentDate = moment(date)
        if(!momentDate.isValid()) {
            store.dispatch(change(meta.form, name, ''))
            return this.props.input.onChange(null)
        }
        this.props.input.onChange(momentDate.format('MM/DD/YYYY'));
    }

    render () {
        const {
            input, placeholder,
            meta: {touched, error}
            } = this.props;

        const handleChange = this.handleChange.bind(this, this.props)

        return (
            <div>
                <DatePicker
                    name={input.name}
                    placeholder={placeholder}
                    dateFormat="YYYY-MM-DD"
                    selected={input.value ? moment(input.value, 'MM/DD/YYYY') : null}
                    onChange={handleChange}
                />
        {touched && error && <span>{error}</span>}
            </div>
        )
    }
}

export default ReduxDatePicker