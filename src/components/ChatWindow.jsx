import React, { Component } from "react";
import "../assets/styles/chatWindow.css";
import ReceiverCard from "./ReceiverCards";
import SenderCard from "./SenderCard";
import { fetchMessages, onSendMessage } from "../actions/actionOnChatWindow";
import { connect } from "react-redux";
import avtarImag from "../assets/images/avtarImag.jpg";

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message_body: "",
      inputMessage: "",
      email: this.props.currentUser.email,
    };
  }
  componentDidMount() {
    this.props.fetchMessages(this.props.message, this.props.newChatDocRef);
  }
  handleOnchange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  chageInputValueAfterSend = () => {
    this.setState({ message_body: "" });
  };

  render() {
    console.log("current user name is" + this.props.userDetails.username);
    return (
      <React.Fragment>
        <div className="col-md-8 chat-window">
          <div className="header-bar">
            <nav className="navbar">
              <div className="username-image">
                <div className="user-image mr-3">
                  <img
                    src={avtarImag}
                    width="40px"
                    height="40px"
                    alt="profile pic"
                    style={{ borderRadius: "20px" }}
                  />
                </div>
                <div className="user-name mt-1">
                  <p style={{ textAlign: "left" }}>
                    {this.props.userDetails.username}
                  </p>
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
          <div className="message-area">
            {this.props.message.map((message) =>
              message !== undefined &&
              message.sender_id !== this.state.email ? (
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
          </div>
          <div className="footer-bar">
            <footer claassname="footer-bar">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  this.props.onSendMessage(
                    this.state.message_body,
                    this.state.email,
                    this.props.newChatDocRef
                  );
                  this.chageInputValueAfterSend();
                }}
              >
                <div className="footer-content">
                  <div className="emoji-icon">
                    <button className="footer-icon">
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
                      placeholder="Type a message"
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
                      <button className="footer-icon">
                        <i className="fa fa-microphone"></i>
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </footer>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    message: state.chats.message,
  };
};

export default connect(mapStateToProps, { fetchMessages, onSendMessage })(
  ChatWindow
);
