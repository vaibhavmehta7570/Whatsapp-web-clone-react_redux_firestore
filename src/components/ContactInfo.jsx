import React, { Component } from "react";
import "../assets/styles/contactInfo.css";
import closeIcon from "../assets/images/close-icon.svg";
import userIcon from "../assets/images/users.svg";
import arrowIcon from "../assets/images/arrow-icon.svg";
import blockIcon from "../assets/images/block-icon.svg";
import thumbDown from "../assets/images/thumb-down.svg";
import deleteIcon from "../assets/images/delete-icon.svg";

class ContactInfo extends Component {
  state = {
    user_id: "",
    username: "",
    email: "",
    bio: "",
    profile_pic: userIcon,
  };

  static getDerivedStateFromProps(props, state) {
    // Initially props.user is undefined
    if (props.user && props.user.user_id !== state.user_id) {
      const { user_id, username, email, bio, profile_pic } = props.user;

      return {
        user_id,
        username,
        email,
        bio: bio || "This user has not added anything his about",
        profile_pic: profile_pic || userIcon,
      };
    }
    return state;
  }

  render() {
    const { username, email, bio, profile_pic } = this.state;

    return (
      <div className="col-lg-3 col-md-4 col-sm-7 chat-side-bar p-0">
        <div className="sidebar">
          <div className="d-flex">
            <img
              className="pointer m-3"
              src={closeIcon}
              alt="close contact info"
              onClick={this.props.hideContactInfo}
            />
            <div className="m-3">Contact Info</div>
          </div>
          <div className="contact-info-container">
            <div className="bg-white">
                <img
                  className="rounded-circle m-4"
                  src={profile_pic}
                  alt="profile pic of contact"
                  width="200px"
                  height="200px"
                />
              <div className="contact-name text-left pl-4 pb-5 h5">
                {username}
              </div>
            </div>
            <div className="bg-white py-3 mb-2">
              <div className="text-left green-text px-4 d-flex justify-content-between">
                <span>Media, Links and Docs</span>
                <img src={arrowIcon} alt="click to see media, links and docs" />
              </div>
              <div className="media-content py-4">No media, Links and Docs</div>
            </div>
            <div className="bg-white pl-4 mb-2 text-left">
              <div className="bottom-border py-3 d-flex justify-content-between align-items-center">
                <span>Mute Notification</span>
                <input className="mr-4" type="checkbox" />
              </div>
              <div className="py-3 d-flex justify-content-between">
                <span>Starred Messages</span>
                <img
                  className="mr-4"
                  src={arrowIcon}
                  alt="click to see starred messages"
                />
              </div>
            </div>
            <div className="bg-white pl-4 mb-2 text-left">
              <div className="bottom-border pt-2">
                <div className="green-text">About and email address</div>
                <div className="my-3 pr-2">{bio}</div>
              </div>
              <div className="py-3 ">{email}</div>
            </div>
            <div className="bg-white pl-4 mb-2 text-left">
              <div className="py-3">
                <img className="mr-4" src={blockIcon} alt="block contact" />
                <span>Block</span>
              </div>
            </div>
            <div className="bg-white pl-4 mb-2 text-left text-danger">
              <div className="py-3">
                <img className="mr-4" src={thumbDown} alt="report contact" />
                <span>Report contact</span>
              </div>
            </div>
            <div className="bg-white pl-4 mb-5 text-left text-danger">
              <div className="py-3">
                <img className="mr-4" src={deleteIcon} alt="delete contact" />
                <span>Delete contact</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactInfo;
