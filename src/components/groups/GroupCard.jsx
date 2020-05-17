import React, { Component } from "react";
import gruopIcon from "../../assets/images/group-default-icon.svg";
import "../../assets/styles/Chat.css";

class Contact extends Component {
  state = {
    groupOptions: false,
  };

  handleButtonClick = () => {
    this.setState(state => {
      return {
        groupOptions: !state.groupOptions,
      };
    });
  };

  hideDropdown = () => {
    this.setState(state => {
      return {
        groupOptions: false,
      };
    });
  };

  render() {
    const { groupName, group_pic } = this.props.group;

    return (
      <div
        className={`container-contact users`}
        onClick={() => this.props.openGroupChatWindow(this.props.group)}
      >
        <div className="user-dp  d-flex align-items-center ml-2">
          <img
            className="rounded-circle"
            src={group_pic || gruopIcon}
            height="50px"
            width="50px"
            alt="contact"
          />
        </div>
        <div className="d-flex align-items-center w-100 ml-3 top-border">
          <span>{groupName}</span>
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
          {this.state.groupOptions && (
            <div className="dropdown-contact">
              <ul>
                <li>Archive chat</li>
                <li>Mute notification</li>
                <li>Exit group</li>
                <li>Pin chat</li>
                <li>Mark as unread</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Contact;
