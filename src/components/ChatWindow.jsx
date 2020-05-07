import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../assets/style/chatWindow.css";
import ReceiverCard from "./ReceiverCards";
import SenderCard from "./SenderCard";
import firebase from "../services/firebase";
import { fetchMessages, onSendMessage } from "../action/actionOnChatWindow";
import { connect } from "react-redux";
import avtarImag from "../assets/images/avtarImag.jpg";
class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.db = firebase.firestore();
    this.state = {
      message_body: "",
      inputMessage: "",
      email: this.props.email,
    };
  }
  componentDidMount() {
    this.props.fetchMessages(this.props.message);
  }
  handleOnchange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  chageInputValueAfterSend = () => {
    this.setState({ message_body: "" });
  };

  render() {
    return (
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-4 chat-side-bar"></div>
          <div class="col-md-8 chat-window">
            <div className="header-bar">
              <nav class="navbar">
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
                  <div className="user-name mt-1">Sidhath Shankar</div>
                </div>
                <div className="search-icon">
                  <button className="header-icon">
                    <i class="fa fa-search"></i>
                  </button>
                </div>
                <div className="file-icon">
                  <button className="header-icon">
                    <i class="fa fa-paperclip"></i>
                  </button>
                </div>
                <div className="menu-icon">
                  <button className="header-icon">
                    <i class="fa fa-ellipsis-v"></i>
                  </button>
                </div>
              </nav>
            </div>
            <div className="message-area">
              {this.props.message.map((message) =>
                message.sender_id !== this.state.email ? (
                  <ReceiverCard
                    key={message.message_id}
                    message={message.message_body}
                    message_id={message.message_id}
                  />
                ) : (
                  <SenderCard
                    key={message.message_id}
                    message={message.message_body}
                    message_id={message.message_id}
                  />
                )
              )}
            </div>
            <div className="footer-bar">
              <footer claassname="footer-bar">
                <div className="footer-content">
                  <div className="emoji-icon">
                    <button className="footer-icon">
                      <i className="fa fa-smile-o"></i>
                    </button>
                  </div>
                  <div class="form-group message-box">
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
                      <button
                        className="footer-icon"
                        onClick={() => {
                          this.props.onSendMessage(
                            this.state.message_body,
                            this.state.email
                          );
                          this.chageInputValueAfterSend();
                        }}
                      >
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
              </footer>
            </div>
          </div>
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

export default connect(mapStateToProps, { fetchMessages, onSendMessage })(
  ChatWindow
);
