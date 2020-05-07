import React, { Component } from "react";
import { connect } from "react-redux";
import { db } from "../services/firebase";
import "../assets/styles/Chat.css";
import Contact from "./Contact";
import user_default from "../assets/images/users.svg";
import TextBox from "./TextBox";
import search from "../assets/images/search.svg";
import { getUsers } from "../actions/contactActions";
import { Link } from "react-router-dom";
import ChatWindow from "./ChatWindow";
class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      searchedUsers: null,
      currentUserDetail: null,
      showChatRoom: false,
    };
  }
  componentDidMount() {
    db.collection("users")
      .get()
      .then((snapshot) => {
        const users = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          users.push(data);
        });
        this.props.getUsers(users);
      })
      .catch((error) => console.log(error));
  }

  // TODO: handle search functionality in search contacts
  handelOnInputChange = (event) => {
    this.setState({ searchString: event.target.value }, () => {
      this.setState((state, props) => ({
        searchedUsers: props.users.filter((user) =>
          user.username
            .toLowerCase()
            .includes(this.state.searchString.toLowerCase())
        ),
      }));
    });
  };
  openChatRoom = (user) => {
    this.setState({ currentUserDetail: user, showChatRoom: true });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="row p-0">
          <div className="col-md-4 chat-side-bar p-0">
            <div className="sidebar">
              <div className="user-detail mt-3 ml-2 mb-3">
                <div className="logout-user-dp">
                  <img
                    src={user_default}
                    alt="current-user-icon"
                    height="40px"
                  />
                  <Link to="/">
                    <button
                      type="button"
                      className="logout-button btn btn-primary mr-2"
                    >
                      Logout
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex mb-2">
                <input
                  type="text"
                  placeholder="Search.."
                  className="search"
                  onChange={this.handelOnInputChange}
                />
                <img src={search} alt="search" className="search-icon" />
              </div>
              <div className="user_list">
                {this.state.searchedUsers
                  ? this.state.searchedUsers.map((user) => {
                      return (
                        <Contact
                          key={user.uid}
                          users={user}
                          onClickUser={this.openChatRoom}
                        />
                      );
                    })
                  : this.props.users.map((user) => {
                      return (
                        <Contact
                          key={user.uid}
                          users={user}
                          onClickUser={this.openChatRoom}
                        />
                      );
                    })}
              </div>
            </div>
          </div>
          {this.state.showChatRoom ? (
            <ChatWindow userDetails={this.state.currentUserDetail} />
          ) : (
            <div className="col-md-8 chat-window before-chat">
              <div className="welcome-image ml-6 mb-2"></div>
              <h3 style={{ color: "#525252" }}>Keep your phone connected</h3>
              <p>
                WhatsApp connects to your phone to sync messages. To reduce data
                <br />
                usage, connect your phone to Wi-Fi.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (data) => dispatch(getUsers(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
