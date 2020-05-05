import React, { Component } from "react";
import "../CSS/chatWindow.css";
import ReceiverCard from "./ReceiverCards";
import SenderCard from "./SenderCard";
import firebase from "../services/firebase";
import { fetchMessages, onSendMessage } from "../Actions/actionOnChatWindow";
import { connect } from "react-redux";
class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.db = firebase.firestore();
    this.state = {};
  }

  componentDidMount() {
    // this.db
    //   .collection("Message")
    //   .doc("USER1id+USSER2id")
    //   .collection("messages")
    //   .onSnapshot((doc) => {
    //     let mesageArray = [...this.state.messages];
    //     console.log(mesageArray);
    //     if (this.state.messages.length > 0) {
    //       let maxTimestamp = 0;
    //       let newMsgObject;
    //       doc.forEach((currentObj) => {
    //         if (currentObj.data().timestamp > maxTimestamp) {
    //           maxTimestamp = currentObj.data().timestamp;
    //           newMsgObject = currentObj.data();
    //         }
    //       });
    //       mesageArray.push(newMsgObject);
    //     } else {
    //       doc.forEach((message) => {
    //         mesageArray.push(message.data());
    //         console.log("Current data: ", message.data());
    //       });
    //       mesageArray = this.sortMessages(mesageArray);
    //     }
    //     this.setState({ messages: mesageArray });
    //   });
    this.props.fetchMessages(this.props.message);
  }

  // sortMessages = (messageArr) => {
  //   messageArr.sort(function (a, b) {
  //     return a.timestamp - b.timestamp;
  //   });
  //   return messageArr;
  // };
  // fetchData = () => {
  //   let mesageArray = [];
  //   this.db
  //     .collection("Message")
  //     .doc("USER1id+USSER2id")
  //     .collection("messages")
  //     .get()
  //     .then((querySnapshot) => {
  //       querySnapshot.forEach(function (doc) {
  //         mesageArray.push(doc.data());
  //         console.log(mesageArray);
  //       });
  //       this.setState({ messages: mesageArray });
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };
  // onSendMessage = () => {
  //   var newMessage = this.db
  //     .collection("Message")
  //     .doc("USER1id+USSER2id")
  //     .collection("messages")
  //     .doc();
  //   newMessage
  //     .set({
  //       message_body: this.props.message,
  //       sender_id: this.props.email,
  //       message_id: newMessage.id,
  //       timestamp: new Date().getTime(),
  //     })
  //     .then((querySnapshot) => {
  //       // this.fetchData();
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };
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
