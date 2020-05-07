import React, { Component } from "react";
class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="form">
        <input type="email" name="email" onChange={this.props.OnchangeEvent} />
        <br />
        <button onClick={this.props.onSubmitEmail}>Submit</button>
      </div>
    );
  }
}

export default Form;
