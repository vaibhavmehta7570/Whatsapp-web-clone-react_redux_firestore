import React, { Component } from "react";
import { connect } from "react-redux";
import { db, auth } from "../services/firebase";
import "../assets/styles/Chat.css";
import Contact from "./Contact";
import user_default from "../assets/images/users.svg";
import search from "../assets/images/search.svg";
import { getUsers } from "../actions/contactActions";
import { Link } from "react-router-dom";
import ChatWindow from "./ChatWindow";
import { fetchMessages } from '../action/actionOnChatWindow'
import { getCurrentUser } from '../actions/currentUserActions'

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      searchedUsers: null,
      userToChatWith: null,
      showChatRoom: false,
      newChatDocRef: null
    };
  }

  componentDidMount() {
    this.checkAuthenticationState()
  }

  checkAuthenticationState = () => {
    auth.onAuthStateChanged(user => {
			if (user) {
        db.collection('users')
          .doc(user.uid)
          .onSnapshot(
            user => {
                this.props.getCurrentUser(user.data())
                this.getAllUsers()
            },
            err => {
              console.error(`Looks like an error => ${err.message}`);
            }
          );
			} else {
        console.log('User is not logged in');
        this.props.getCurrentUser({})
			}
		});
  }

  getAllUsers = () => {
    db.collection("users")
      .get()
      .then((snapshot) => {
        const users = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          if ( data.user_id !== this.props.currentUser.user_id) {
            users.push(data);
          }
        });
        this.props.getUsers(users);
      })
      .catch((error) => console.log(error));
  }

  // Search functionality in search contacts
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

  handleSignOut = () => {
		auth
			.signOut()
			.then(() => {
        console.log('Sign Out successful');

			})
			.catch(err => {
				console.log('Sign Out failed', err);
			});
	};
  
  openChatRoom = (user) => {
    // console.log('LoggedIn User: ' , this.props.currentUser, 'Chatting with User: ', user)
    const chatID = this.createUniqueChatID(this.props.currentUser, user);
    console.log(chatID)
    const newChat = db.collection('chats').doc(chatID);
    this.setState({ userToChatWith: user, showChatRoom: true, newChatDocRef: newChat});
    this.props.fetchMessages(this.props.message, newChat)

  };

  createUniqueChatID = (loggedInUser, chatWithUser) => {
    if(loggedInUser.user_id.toLowerCase() < chatWithUser.user_id.toLowerCase()) {
      return loggedInUser.user_id + chatWithUser.user_id;
    } else {
      return chatWithUser.user_id + loggedInUser.user_id;
    }
  }

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
                      onClick={this.handleSignOut}
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
                          key={user.user_id}
                          users={user}
                          onClickUser={this.openChatRoom}
                        />
                      );
                    })
                  : this.props.users.map((user) => {
                      return (
                        <Contact
                          key={user.user_id}
                          users={user}
                          onClickUser={this.openChatRoom}
                        />
                      );
                    })}
              </div>
            </div>
          </div>
          {this.state.showChatRoom ? (
            <ChatWindow
              userDetails={this.state.userToChatWith}
              currentUser={this.props.currentUser}
              newChatDocRef={this.state.newChatDocRef}
            />
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
    currentUser: state.currentUser,
    message: state.chats.message,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (data) => dispatch(getUsers(data)),
    getCurrentUser: (data) => dispatch(getCurrentUser(data)),
    fetchMessages: (message, docRef) => dispatch(fetchMessages(message, docRef))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
