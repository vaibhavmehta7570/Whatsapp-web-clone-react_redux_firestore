import React, { Component } from "react";
import "../assets/styles/userInfo.css";
import { db } from "../services/firebase";
import { storage } from "../services/firebase";
import userIcon from "../assets/images/users.svg";
import ImageUploader from "./ImageUploader";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editUserName: false,
      editUserDescription: false,
      userName: "",
      description: "",
      image: "",
      imageURL: null,
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
  changeProfilePic = (event) => {
    console.log(event.target.files[0]);
    let imageName = event.target.files[0].name;
    this.setState({ image: event.target.files[0] }, () => {
      this.uploadProfilePicToStorage(imageName);
    });
  };

  uploadProfilePicToStorage = async (image_name) => {
    var storageRef = storage.ref();
    var imageLoc = storageRef.child(
      `profilePic/${this.props.id}/${image_name}`
    );
    let snapshot = await imageLoc.put(this.state.image);
    console.log(snapshot);
    let imgURL = await storageRef
      .child(snapshot.metadata.fullPath)
      .getDownloadURL();
    console.log(imgURL);
    this.setState({ imageURL: imgURL }, () => {
      this.updateProfilePic();
    });
  };
  updateProfilePic = () => {
    console.log(this.state.imageURL);
    var dbRef = db.collection("users").doc(this.props.id);
    dbRef
      .update({
        profile_pic: this.state.imageURL,
      })
      .then(function () {
        console.log("profile pic successfully updated!");
      })
      .catch(function (error) {
        console.error("Error updating profile pic: ", error);
      });
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
          <ImageUploader
            textContent="CHANGE PROFILE PHOTO"
            changePic={this.changeProfilePic}
            imageSrc={this.props.profilePic || userIcon}
          />
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
