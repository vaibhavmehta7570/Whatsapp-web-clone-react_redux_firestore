import React, { Component } from "react";
import { connect } from "react-redux";
import "../assets/styles/chatWindow.css";
import ReceiverCard from "./ReceiverCards";
import SenderCard from "./SenderCard";
import { onSendMessage } from "../actions/actionOnChatWindow";
import avtarImag from "../assets/images/users.svg";

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message_body: "",
      inputMessage: "",
      email: "",
      username: "",
      sender_id: "",
    };
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView();
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.currentUser && props.currentUser.user_id !== state.sender_id) {
      return {
        email: props.currentUser.email,
        username: props.currentUser.username,
        sender_id: props.currentUser.user_id,
      };
    }
    return state;
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  handleOnchange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  chageInputValueAfterSend = () => {
    this.setState({ message_body: "" });
  };

  sendMessage = (event) => {
    event.preventDefault();
    if (this.state.message_body.trim().length > 0) {
      this.props.onSendMessage(
        this.state.message_body,
        this.state.sender_id,
        this.state.email,
        this.state.username,
        this.props.newChatDocRef,
        this.props.userDetails
      );
    }
    this.chageInputValueAfterSend();
  };

  render() {
    const { showContact, userDetails: { profile_pic } = {} } = this.props;
    return (
      <div
        className={
          showContact
            ? "col-lg-6 col-md-5 chat-window col-sm-hide"
            : "col-8 chat-window"
        }
      >
        <div className="header-bar">
          <nav className="navbar">
            <div
              className="d-flex align-items-center pointer"
              onClick={this.props.showContactInfo}
            >
              <div className="user-image">
                <img
                  src={profile_pic || avtarImag}
                  width="42px"
                  height="42px"
                  alt="profile pic"
                  className="rounded-circle"
                />
              </div>
              <div className="user-name ml-3">
                <span>{this.props.userDetails.username}</span>
              </div>
            </div>
            <div className="d-flex">
              <div className="searchbar-icon mr-3">
                <button className="header-icon">
                  <i className="fa fa-search"></i>
                </button>
              </div>
              <div className="file-icon mr-3">
                <button className="header-icon">
                  <i className="fa fa-paperclip"></i>
                </button>
              </div>
              <div className="menu-icon mr-3">
                <button className="header-icon">
                  <i className="fa fa-ellipsis-v"></i>
                </button>
              </div>
            </div>
          </nav>
        </div>
        <div className="message-area pb-3">
          {this.props.message.map((message) =>
            message !== undefined &&
            message.sender_id !== this.state.sender_id ? (
              <ReceiverCard
                key={message.message_id}
                message={message.message_body}
                message_id={message.message_id}
                message_time={message.timestamp}
                username={this.props.userDetails.username}
              />
            ) : (
              <SenderCard
                key={message.message_id}
                message={message.message_body}
                message_id={message.message_id}
                message_time={message.timestamp}
              />
            )
          )}
          <div
            className="auto-scroll"
            style={{ float: "left", clear: "both" }}
            ref={(el) => {
              this.messagesEnd = el;
            }}
          ></div>
        </div>
        <div className="footer-bar">
          <footer claassname="footer-bar">
            <form onSubmit={this.sendMessage}>
              <div className="footer-content">
                <div className="emoji-icon">
                  <button className="footer-icon" type="button">
                    <i className="fa fa-smile-o"></i>
                  </button>
                </div>
                <div className="form-group message-box">
                  <input
                    type="text"
                    className="form-control message-input"
                    name="message_body"
                    value={this.state.message_body}
                    onChange={this.handleOnchange}
                    placeholder="Type a message..."
                  />
                </div>
                {this.state.message_body !== "" ? (
                  <div className="send-icon">
                    <button className="footer-icon" type="submit">
                      <i className="fa fa-send-o"></i>
                    </button>
                  </div>
                ) : (
                  <div className="mic-icon mr-2">
                    <button className="footer-icon" type="button">
                      <i className="fa fa-microphone"></i>
                    </button>
                  </div>
                )}
              </div>
            </form>
          </footer>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    message: state.chats.message,
  };
};

export default connect(mapStateToProps, { onSendMessage })(ChatWindow);
