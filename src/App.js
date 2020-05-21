import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Chat from "./components/Chat";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import { auth } from "./services/firebase";
import { userLoggedIn } from "./actions/authActions";
import SignInRoute from "./hoc/SignInRoute";
import SignOutRoute from "./hoc/SignOutRoute";

class App extends Component {
  state = {
    authenticationComplete: false,
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      this.props.userLoggedIn(user);
      this.setState({ authenticationComplete: true });
    }, err => {
      console.error("Looks like an error: ", err)
    });
  }

  render() {
    return (
      <BrowserRouter>
        {this.state.authenticationComplete && (
          <div>
            <Route exact path="/" component={Home} />
            <SignOutRoute path="/signup" component={SignUp} />
            <SignOutRoute path="/login" component={LogIn} />
            <SignInRoute path="/chat" component={Chat} />
          </div>
        )}
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  userLoggedIn: (isLoggedIn) => dispatch(userLoggedIn(isLoggedIn)),
});

export default connect(null, mapDispatchToProps)(App);
