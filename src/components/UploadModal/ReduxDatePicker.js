import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import moment from 'moment'

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

    handleChange (date) {
        this.props.input.onChange(moment(date).format('MM/DD/YYYY'));
    }

    render () {
        const {
            input, placeholder,
            meta: {touched, error}
            } = this.props;

        return (
            <div>
                <DatePicker
                    name={input.name}
                    placeholder={placeholder}
                    dateFormat="YYYY-MM-DD"
                    selected={input.value ? moment(input.value, 'MM/DD/YYYY') : null}
                    onChange={this.handleChange}
                />
        {touched && error && <span>{error}</span>}
            </div>
        )
    }
}

export default ReduxDatePicker