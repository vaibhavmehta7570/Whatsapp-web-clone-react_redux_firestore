import React, { Component } from "react";
import "../assets/styles/userInfo.css";
import userIcon from "../assets/images/users.svg";
import cameraIcon from "../assets/images/camera-solid.svg";
import { db } from "../services/firebase";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editUserName: false,
      editUserDescription: false,
      userName: "",
      description: "",
    };
  }

  componentDidMount() {
    this.setState({
      userName: this.props.userName,
      description: this.props.desc,
    });
  }
  handleEditUserName = () => {
    this.setState({ editUserName: true });
  };
  saveUpdatedName = () => {
    var dbRef = db.collection("users").doc(this.props.id);
    dbRef
      .update({
        username: this.state.userName,
      })
      .then(function () {
        console.log("Name successfully updated!");
      })
      .catch(function (error) {
        console.error("Error updating document: ", error);
      });
    this.setState({ editUserName: false });
  };
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleEditDescription = () => {
    this.setState({ editUserDescription: true });
  };
  saveUpdatedDescription = () => {
    var dbRef = db.collection("users").doc(this.props.id);
    dbRef
      .update({
        description: this.state.description,
      })
      .then(function () {
        console.log("Description successfully updated!");
      })
      .catch(function (error) {
        console.error("Error updating document: ", error);
      });
    this.setState({ editUserDescription: false });
  };
  render() {
    return (
      <div className="sidebar">
        <header className="profile-header">
          <div className="profile-header-content">
            <div className="left-arrow mr-2" onClick={this.props.handleGoBack}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="currentColor"
                  d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z"
                ></path>
              </svg>
            </div>
            <div className="header-title">Profile</div>
          </div>
        </header>
        <div className="profile-body">
          <div className="profile-pic-container">
            <div className="pic-container">
              <div className="fake-hover-div rounded-circle flex-column align-items-center justify-content-center">
                <img src={cameraIcon} alt="camera icon" width="20px" />
                <p className="text-white w-50 mt-3">CHANGE PROFILE PHOTO</p>
              </div>
              <input
                type="file"
                accept="image/gif,image/jpeg,image/jpg,image/png"
                className="select-file pointer"
              ></input>
              <img
                src={this.props.profilePic || userIcon}
                className="profile-image rounded-circle"
                alt="profile pic"
              />
            </div>
          </div>
          <div className="profile-user-name">
            {/* class for name*/}
            <div className="your-name-text">Your Name</div>
            <div className="display-user-name">
              {this.state.editUserName ? (
                <div className="edit-user-name">
                  <input
                    type="text"
                    name="userName"
                    value={this.state.userName}
                    className="form-control input-name"
                    onChange={this.handleInputChange}
                  />
                  <div className="tick-icon" onClick={this.saveUpdatedName}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="currentColor"
                        d="M9 17.2l-4-4-1.4 1.3L9 19.9 20.4 8.5 19 7.1 9 17.2z"
                      ></path>
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="show-user-name">
                  <div className="u-name">{this.props.userName}</div>
                  <div
                    className="pencil-icon"
                    onClick={this.handleEditUserName}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="currentColor"
                        d="M3.95 16.7v3.4h3.4l9.8-9.9-3.4-3.4-9.8 9.9zm15.8-9.1c.4-.4.4-.9 0-1.3l-2.1-2.1c-.4-.4-.9-.4-1.3 0l-1.6 1.6 3.4 3.4 1.6-1.6z"
                      ></path>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="profile-info-message">
            This is not your username or pin. This name will be visible to your
            WhatsApp contacts.
          </div>

          <div className="profile-description">
            <div className="about">About</div>
            <div className="display-description">
              {this.state.editUserDescription ? (
                <div className="edit-description">
                  <input
                    type="text"
                    name="description"
                    value={this.state.description}
                    className="form-control input-name"
                    onChange={this.handleInputChange}
                  />
                  <div
                    className="tick-icon"
                    onClick={this.saveUpdatedDescription}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="currentColor"
                        d="M9 17.2l-4-4-1.4 1.3L9 19.9 20.4 8.5 19 7.1 9 17.2z"
                      ></path>
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="show-description">
                  <div className="u-name">{this.props.desc}</div>
                  <div
                    className="pencil-icon"
                    onClick={this.handleEditDescription}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="currentColor"
                        d="M3.95 16.7v3.4h3.4l9.8-9.9-3.4-3.4-9.8 9.9zm15.8-9.1c.4-.4.4-.9 0-1.3l-2.1-2.1c-.4-.4-.9-.4-1.3 0l-1.6 1.6 3.4 3.4 1.6-1.6z"
                      ></path>
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfo;
