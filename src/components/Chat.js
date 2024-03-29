import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { db, auth } from "../services/firebase";
import "../assets/styles/Chat.css";
import Contact from "./Contact";
import user_image from "../assets/images/users.svg";
import { getUsers } from "../actions/contactActions";
import ChatWindow from "./ChatWindow";
import { getAllMessages, addNewMessage } from "../actions/actionOnChatWindow";
import { getCurrentUser } from "../actions/currentUserActions";
import UserInfo from "./UserInfo";
import ContactInfo from "./ContactInfo";
import NotificationSwitch from "./NotificationSwitch";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.state = {
      searchString: "",
      searchedUsers: null,
      userToChatWith: null,
      showChatRoom: false,
      newChatDocRef: null,
      showArrow: false,
      showUserInfo: false,
      open: false,
      showContact: false,
      notificationAlert: false,
      unsubscribeSnapshot: null,
    };
  }

  handleButtonClick = () => {
    this.setState((state) => {
      return {
        open: !state.open,
      };
    });
  };

  componentDidMount() {
    this.checkAuthenticationState();
    document.addEventListener("mousedown", this.handleClickOutside);
    this.notificationPermission()
  }

  notificationPermission() {
    if (!("Notification" in window)) {
      alert("Your browser doesn't support desktop notifications")
    } else if (Notification.permission === "default") {
      this.setState({ notificationAlert: true })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.userToChatWith?.user_id !== prevState.userToChatWith?.user_id) {
      const { newChatDocRef, userToChatWith, unsubscribeSnapshot } = this.state

      if (prevState.newChatDocRef === null) {
        this.setState({
          unsubscribeSnapshot: this.docSnapshot(newChatDocRef, userToChatWith)
        })
      } else {
        unsubscribeSnapshot()
        this.setState({
          unsubscribeSnapshot: this.docSnapshot(newChatDocRef, userToChatWith)
        })
      }
    }
  }

  docSnapshot = (chatDocRef, userOnActiveChat) => {
    // to avoid first snapshot call that fetches all the existing docs
    let newDocAdded = false
    // return a function that can later be called to unsubscribe
    return chatDocRef
      .orderBy("timestamp")
      .onSnapshot(snapshot => {
        if (newDocAdded) {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              this.props.addNewMessage(change.doc.data());
              const { sender_id } = change.doc.data()
              if (sender_id === userOnActiveChat.user_id) {
                this.sendNotification(change.doc.data())
              }
            }
          });
        }
        newDocAdded = true
      }, err => {
        console.error("Looks like an error: ", err)
      });
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({
        open: false,
      });
    }
  };

  checkAuthenticationState = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .onSnapshot(
            (user) => {
              this.props.getCurrentUser(user.data());
              this.getAllUsers();
            },
            (err) => {
              console.error(`Looks like an error => ${err.message}`);
            }
          );
      } else {
        console.log("User is not logged in");
        this.props.getCurrentUser({});
      }
    });
  };

  getAllUsers = () => {
    db.collection("users")
      .onSnapshot((snapshot) => {
        const users = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.user_id !== this.props.currentUser.user_id) {
            users.push(data);
          }
        });
        this.props.getUsers(users);
      }, (error) => console.log(error))
  };

  // Search functionality in search contacts
  handleOnInputChange = (event) => {
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

  animateSearchBar = () => {
    this.setState({ showArrow: true });
  };

  exitFromSearchBar = (e) => {
    e.stopPropagation();
    this.setState({ showArrow: false, searchString: "", searchedUsers: null });
  };

  handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Sign Out successful");
      })
      .catch((err) => {
        console.log("Sign Out failed", err);
      });
  };

  openChatRoom = (user) => {
    const chatID = this.createUniqueChatID(this.props.currentUser, user);
    const newChat = db.collection("chats").doc(chatID).collection("messages");
    this.setState({
      userToChatWith: user,
      showChatRoom: true,
      newChatDocRef: newChat,
      bgColor: "grey",
    });
    this.props.getAllMessages(newChat);
  };

  createUniqueChatID = (loggedInUser, chatWithUser) => {
    if (
      loggedInUser.user_id.toLowerCase() < chatWithUser.user_id.toLowerCase()
    ) {
      return loggedInUser.user_id + chatWithUser.user_id;
    } else {
      return chatWithUser.user_id + loggedInUser.user_id;
    }
  };

  showUserInfo = () => {
    this.setState({ showUserInfo: true });
  };

  goBackToUserList = () => {
    this.setState({ showUserInfo: false });
  };

  showContactInfo = () => {
    this.setState({
      showContact: true,
    });
  };

  hideContactInfo = () => {
    this.setState({
      showContact: false,
    });
  };

  activeContact = (user) => {
    return this.state.userToChatWith?.user_id === user.user_id ? "active" : "";
  };

  sendNotification = ({ sender_name: title, message_body: body }) => {
    if ("Notification" in window && Notification.permission === "granted") {
      const options = {
        body,
      }
      const notification = new Notification(title, options)
      setTimeout(() => {
        notification.close()
      }, 3333) // close notification after 3333 miliseconds
    }
  }

  handleNotificationPermission = () => {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        this.setState({ notificationAlert: false })
        console.log("You have allowed desktop notifications")
      } else if (permission === "denied") {
        this.setState({ notificationAlert: false })
        console.log("You have blocked desktop notification")
      }
    })
  }

  render() {
    const userDetail = this.props.currentUser;
    return (
      <div className="container-fluid">
        <div className="row p-0">
          <div
            className={
              this.state.showContact
                ? "col-lg-3 col-md-3 col-sm-5 chat-side-bar p-0"
                : "col-4 chat-side-bar p-0"
            }
          >
            {this.state.showUserInfo ? (
              <UserInfo
                handleGoBack={this.goBackToUserList}
                userName={userDetail.username}
                id={userDetail.user_id}
                desc={userDetail.description}
                profilePic={userDetail.profile_pic}
              />
            ) : (
                <div className="sidebar">
                  <div className="user-detail">
                    <div className="logout-user-dp d-flex justify-content-between p-2">
                      <img
                        src={this.props.currentUser?.profile_pic || user_image}
                        alt="current-user-icon"
                        height="40px"
                        width="40px"
                        className="user-profile-img pointer rounded-circle"
                        onClick={this.showUserInfo}
                      />
                      <div className="user-icons d-flex align-items-center">
                        <div className="status-icon pointer mr-3">
                          <svg
                            id="ee51d023-7db6-4950-baf7-c34874b80976"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                          >
                            <path
                              fill="currentColor"
                              d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"
                            ></path>
                          </svg>
                        </div>
                        <div className="newChat-icon pointer mx-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                          >
                            <path
                              fill="currentColor"
                              d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
                            ></path>
                          </svg>
                        </div>
                        <div
                          className="container user-menu-icon pointer mx-3"
                          ref={this.container}
                        >
                          <svg
                            type="button"
                            onClick={this.handleButtonClick}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                          >
                            <path
                              fill="currentColor"
                              d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
                            ></path>
                          </svg>
                          {this.state.open && (
                            <div className="dropdown">
                              <ul>
                                <li>Profile</li>
                                <li>Settings</li>
                                <li>New group</li>
                                <Link to="/">
                                  <li onClick={this.handleSignOut}>Log out</li>
                                </Link>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {this.state.notificationAlert && (
                      <div onClick={this.handleNotificationPermission}>
                        <NotificationSwitch />
                      </div>
                    )}
                    <div className="search-bar">
                      <div className="search-box" onClick={this.animateSearchBar}>
                        {this.state.showArrow ? (
                          <i
                            className="fas fa-arrow-left ml-4 mr-3 mt-2 blue"
                            style={{ cursor: "pointer" }}
                            onClick={this.exitFromSearchBar}
                          ></i>
                        ) : (
                            <i
                              className="fa fa-search ml-4 mr-3 mt-2 light-"
                              style={{ cursor: "pointer", color: "#919191" }}
                            ></i>
                          )}
                        <input
                          type="text"
                          placeholder="Search or start a new chat"
                          className=" form-control search"
                          value={this.state.searchString}
                          onChange={this.handleOnInputChange}
                        />
                      </div>
                    </div>
                    <div className="user-list-container">
                      <div className="user_list">
                        {this.state.searchedUsers
                          ? this.state.searchedUsers.map((user) => {
                            const activeContact = this.activeContact(user);
                            return (
                              <Contact
                                key={user.user_id}
                                users={user}
                                onClickUser={this.openChatRoom}
                                active={activeContact}
                              />
                            );
                          })
                          : this.props.users.map((user) => {
                            const activeContact = this.activeContact(user);
                            return (
                              <Contact
                                key={user.user_id}
                                users={user}
                                onClickUser={this.openChatRoom}
                                active={activeContact}
                              />
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
          {this.state.showChatRoom ? (
            <ChatWindow
              userDetails={this.state.userToChatWith}
              currentUser={this.props.currentUser}
              newChatDocRef={this.state.newChatDocRef}
              showContactInfo={this.showContactInfo}
              showContact={this.state.showContact}
            />
          ) : (
              <div className="col-8 chat-window before-chat">
                <div className="welcome-image ml-6 mb-2"></div>
                <h3 style={{ color: "#525252" }}>Keep your phone connected</h3>
                <p>
                  WhatsApp connects to your phone to sync messages. To reduce data
                <br />
                usage, connect your phone to Wi-Fi.
              </p>
              </div>
            )}
          {this.state.showContact && (
            <ContactInfo
              user={this.state.userToChatWith}
              hideContactInfo={this.hideContactInfo}
            />
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
    getAllMessages: (docRef) => dispatch(getAllMessages(docRef)),
    addNewMessage: (message) => dispatch(addNewMessage(message))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
