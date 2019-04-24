import React, { Component } from 'react';
import { Button } from 'reactstrap';

class NavButton extends Component {
    handleClick = (ev) => {
        const handle = this.props.onClick;
        if (handle) {
            handle(this.props.name);
        }
    }

    render() {
        const isSelected = this.props.selected === this.props.name;
        const cls = isSelected ? "" : "btn-link";

        return (
            <Button color={isSelected ? "primary" : ""} className={cls} onClick={this.handleClick} disabled={this.props.disable}>
                {this.props.name}
            </Button>
        );
    }
}

export default NavButton;