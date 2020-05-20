import React, { Component } from "react";
import user_default from "../assets/images/users.svg";
import group_default from "../assets/images/group-default-icon.svg";
import "../assets/styles/Chat.css";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
    };
  }

  handleButtonClick = () => {
    this.setState(state => {
      return {
        showDropdown: !state.showDropdown,
      };
    });
  };

  hideDropdown = () => {
    this.setState(state => {
      return {
        showDropdown: false,
      };
    });
  };

  handleClick = () => {
    const { user, group, openChatWindow } = this.props
    if (user) {
      openChatWindow(user)
    } else if (group) {
      openChatWindow(group)
    }
  }

  render() {
    const { user, group } = this.props;
    const { profile_pic, username } = user || {};
    const { groupName, group_pic } = group || {};
    const default_pic = user ? user_default : group_default;

    return (
      <div
        className={`container-contact users ${this.props.active}`}
        onClick={this.handleClick}
      >
        <div className="user-dp  d-flex align-items-center ml-2">
          <img
            className="rounded-circle"
            src={profile_pic || group_pic || default_pic}
            height="50px"
            width="50px"
            alt="contact"
          />
        </div>
        <div className="d-flex align-items-center w-100 ml-3 top-border">
          <span>{username || groupName}</span>
        </div>
        <div
          className="container-drop align-items-center"
          tabIndex="1"
          onBlur={this.hideDropdown}
        >
          <img
            type="button"
            src="https://img.icons8.com/android/24/000000/expand-arrow.png"
            alt="down arrow"
            className="down-arrow mr-3"
            onClick={this.handleButtonClick}
          />
          {this.state.showDropdown &&
            (user ? (
              <div className="dropdown-contact">
                <ul>
                  <li>Archive chat</li>
                  <li>Mute notification</li>
                  <li>Delete Chat</li>
                  <li>Mark as unread</li>
                </ul>
              </div>
            ) : (
              <div className="dropdown-contact">
                <ul>
                  <li>Archive chat</li>
                  <li>Mute notification</li>
                  <li>Exit group</li>
                  <li>Pin chat</li>
                  <li>Mark as unread</li>
                </ul>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Contact;
