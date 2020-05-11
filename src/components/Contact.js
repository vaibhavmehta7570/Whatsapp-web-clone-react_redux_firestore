import React, { Component } from "react";
import user_default from "../assets/images/users.svg";
import "../assets/styles/Chat.css";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = {
      contactArrowOpen: false,
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({
        contactArrowOpen: false,
      });
    }
  };

  handleButtonClick = () => {
    this.setState((state) => {
      return {
        contactArrowOpen: !state.contactArrowOpen,
      };
    });
  };

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
        <div className="container-drop align-items-center" ref={this.container}>
          <img
            type="button"
            src="https://img.icons8.com/android/24/000000/expand-arrow.png"
            alt="down arrow"
            className="down-arrow mr-3"
            onClick={this.handleButtonClick}
          />
          {this.state.contactArrowOpen && (
            <div className="dropdown-contact">
              <ul>
                <li>Archive chat</li>
                <li>Mute notification</li>
                <li>Delete Chat</li>
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
