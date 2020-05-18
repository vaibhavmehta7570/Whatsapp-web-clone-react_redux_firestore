import React, { Component } from "react";
import { connect } from "react-redux";
import "../../assets/styles/chatWindow.css";
import ReceiverCard from "../ReceiverCards";
import SenderCard from "../SenderCard";
import groupIcon from "../../assets/images/group-default-icon.svg";
import { sendMessage } from "../../actions/groupMessagesActions";

class ChatWindow extends Component {
  state = {
    message_body: "",
  };

  componentDidMount() {
    this.belowLastMessage.scrollIntoView();
  }

  componentDidUpdate() {
    this.belowLastMessage.scrollIntoView();
  }
  

  handleChange = event => {
    this.setState({ message_body: event.target.value });
  };

  sendMessageToGroup = event => {
    event.preventDefault();
    this.setState({ message_body: "" });
    const { currentUser, group } = this.props;
    const { message_body } = this.state;
    sendMessage(currentUser, group, message_body);
  };

  render() {
    const {
      currentUser,
      showGroup,
      group: { group_pic, groupName } = {},
    } = this.props;
    const { message_body } = this.state;

    return (
      <div
        className={
          showGroup
            ? "col-lg-6 col-md-5 chat-window col-sm-hide"
            : "col-8 chat-window"
        }
      >
        <div className="header-bar">
          <nav className="navbar">
            <div
              className="d-flex align-items-center pointer"
              onClick={this.props.showGroupInfo}
            >
              <div className="user-image">
                <img
                  src={group_pic || groupIcon}
                  width="42px"
                  height="42px"
                  alt="profile pic"
                  className="rounded-circle"
                />
              </div>
              <div className="user-name ml-3">
                <span>{groupName}</span>
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
          {this.props.groupMessages.map(message =>
            message !== undefined &&
            message.sender_id !== currentUser.user_id ? (
              <ReceiverCard
                key={message.message_id}
                message={message}
              />
            ) : (
              <SenderCard
                key={message.message_id}
                message={message}
              />
            )
          )}
          <div
            className="auto-scroll"
            style={{ float: "left", clear: "both" }}
            ref={element => {
              this.belowLastMessage = element;
            }}
          ></div>
        </div>
        <div className="footer-bar">
          <footer claassname="footer-bar">
            <form onSubmit={this.sendMessageToGroup}>
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
                    value={message_body}
                    onChange={this.handleChange}
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

const mapStateToProps = ({ groupMessages }) => {
  return {
    groupMessages,
  };
};

export default connect(mapStateToProps)(ChatWindow);
