import React from "react";
import ReactDOM from "react-dom";

var Buttonfy = React.createClass({
    render: function() {
        return (
            <div>
                <button type={this.props.behavior}> {this.props.children}!</button>
            </div>
        );
    }
});

ReactDOM.render(
    <div>
        <Buttonfy behaviorer="submit">Submit</Buttonfy>
        <Buttonfy behaviorer="reset">Reset</Buttonfy>
        <Buttonfy behaviorer="submit">Submit</Buttonfy>
    </div>,
    document.querySelector("#container")
);

