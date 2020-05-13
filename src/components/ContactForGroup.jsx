import React, { Component } from "react";
import user_default from "../assets/images/users.svg";

class ContactForGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        className={`container-contact users ${this.props.active}`}
        onClick={() => this.props.onClickUser(this.props.users)}
      >
        <div className="user-dp  d-flex align-items-center ml-2">
          <img
            className="rounded-circle"
            src={this.props.users.profile_pic || user_default}
            height="50px"
            alt="contact"
          />
        </div>
        <div className="d-flex align-items-center w-100 ml-3 bottom-border">
          <span>{this.props.users.username}</span>
        </div>
      </div>
    );
  }
}

export default ContactForGroup;
