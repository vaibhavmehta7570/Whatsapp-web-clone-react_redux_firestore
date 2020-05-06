import React, { Component } from "react";
import "../assets/style/chatWindow.css";
import ReceiverCard from "./ReceiverCards";
import SenderCard from "./SenderCard";
import firebase from "../services/firebase";
import { fetchMessages, onSendMessage } from "../action/actionOnChatWindow";
import { connect } from "react-redux";
class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.db = firebase.firestore();
    this.state = {};
  }
  componentDidMount() {
    this.props.fetchMessages(this.props.message);
  }
  render() {
    console.log(this.props.message);
    return (
      <div className="chat-window">
        <header className="username">{this.props.username}</header>
        <div className="chat-room">
          <div className="message-card">
            {this.props.message.map((message) =>
              message.sender_id === "zxcsidharth@gmail.com" ? (
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
          <div className="send-window">
            <input
              type="text"
              name="chat"
              onChange={this.props.OnChangeEvent}
            />
            <button
              onClick={() =>
                this.props.onSendMessage(
                  this.props.messageBody,
                  this.props.email
                )
              }
            >
              Send
            </button>
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
