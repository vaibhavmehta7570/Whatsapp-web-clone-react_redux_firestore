import React, { Component } from "react";
import Form from "./components/Form";
import ChatWindow from "./components/ChatWindow";
import firebase from "./services/firebase";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.db = firebase.firestore();
    this.state = {
      email: "",
      inputEmail: "",
      showForm: true,
      chat: "",
      inputMessage: "",
    };
  }
  handleOnchange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitEmail = () => {
    this.setState({ inputEmail: this.state.email, showForm: false });
  };

  render() {
    return (
      <div className="home">
        {this.state.showForm ? (
          <Form //just done for demo purpose
            OnchangeEvent={this.handleOnchange}
            onSubmitEmail={this.submitEmail}
          />
        ) : (
          <ChatWindow
            username={this.state.inputEmail}
            OnChangeEvent={this.handleOnchange}
            onSendMessage={this.sendMessage}
            messageBody={this.state.chat}
            email={this.state.inputEmail}
          />
        )}
      </div>
    );
  }
}

export default App;
