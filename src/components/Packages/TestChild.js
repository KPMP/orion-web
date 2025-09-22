import { Component } from "react";


class TestChild extends Component {
    constructor(props) {
        super(props);
        console.log("TestChild Constructor");
        console.log(this.props)
        this.state = {
            testState: "This is a test state"
        }
    }

    render() {
        console.log("TestChild render");
        return <div>Test Child Component</div>;
    }

}

export default TestChild;