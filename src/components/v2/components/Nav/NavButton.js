import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

class NavButton extends Component {
    handleClick = (ev) => {
        const handle = this.props.onClick;
        if (handle) {
            handle(this.props.name);
        }
    }

    render() {
        let cls = "btn";
        if (this.props.selected === this.props.name) {
            cls = cls + " btn-primary";
        } else {
            cls = cls + " btn-link";
        }

        return (
            <Button className={cls} onClick={this.handleClick}>
                {this.props.name}
            </Button>
        );
    }
}

export default NavButton;