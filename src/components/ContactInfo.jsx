import React from "react";
import firebase, { db } from "../services/firebase";
import { storage } from "../services/firebase";
import closeIcon from "../assets/images/close-icon.svg";
import userIcon from "../assets/images/users.svg";
import groupIcon from "../assets/images/group-default-icon.svg";
import arrowIcon from "../assets/images/arrow-icon.svg";
import blockIcon from "../assets/images/block-icon.svg";
import thumbDown from "../assets/images/thumb-down.svg";
import deleteIcon from "../assets/images/delete-icon.svg";
import editIcon from "../assets/images/pencil.svg";
import exitIcon from "../assets/images/exit-arrow.svg";
import searchIcon from "../assets/images/search.svg";
import addMemberIcon from "../assets/images/add-member.svg";
import inviteLinkIcon from "../assets/images/invite-link.svg";
import GroupMember from "./groups/GroupMember";
import "../assets/styles/contactInfo.css";
import Modal from "./groups/Modal";
import ImageUploader from "./ImageUploader";

<!-- <<<<<<< feature/group/new -->
class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      setShowModal: false,
      groupImage: "",
      imageURL: null,
      editGroupName: false,
      groupName: "",
      description: "",
      editGroupDescription: "",
    };
  }
// =======
// const ContactInfo = ({
//   user,
//   group,
//   hideContactInfo,
//   currentUser,
//   hideGroupChatWindow,
//   openGroupChatWindow,
// }) => {
//   const { username, email, description: bio, profile_pic } = user || {};
//   const {
//     groupName,
//     description,
//     group_pic,
//     admins,
//     members,
//     membersIdArray,
//     createdAt,
//     group_id,
//   } = group || {};
// >>>>>>> feature/Groups

  changeProfilePic = (event) => {
    let imageName = event.target.files[0].name;
    this.setState({ groupImage: event.target.files[0] }, () => {
      this.uploadProfilePicToStorage(imageName);
    });
  };

  uploadProfilePicToStorage = async (image_name) => {
    var storageRef = storage.ref();
    var imageLoc = storageRef.child(
      `groupProfileImages/${this.props.group.group_id}/${image_name}`
    );
    let snapshot = await imageLoc.put(this.state.groupImage);
    let imgURL = await storageRef
      .child(snapshot.metadata.fullPath)
      .getDownloadURL();
    this.setState({ imageURL: imgURL }, () => {
      this.updateGroupProfilePic();
    });
  };
  updateGroupProfilePic = () => {
    console.log(this.state.imageURL);
    var dbRef = db.collection("groups").doc(this.props.group.group_id);
    dbRef
      .update({
        group_pic: this.state.imageURL,
      })
      .then(function () {
        console.log("Group profile pic successfully updated!");
      })
      .catch(function (error) {
        console.error("Error updating Group profile pic: ", error);
      });
  };

  exitGroup = (members, admins, group_id) => {
    const currentUser = this.props.currentUser;
    const newMembers = members.filter(
      (member) => member.user_id !== currentUser.user_id
    );
    if (admins.includes(currentUser.user_id)) {
      if (admins.length === 1) {
        console.log("Only one admin! Sorry can't exit");
      } else if (admins.length >= 1) {
        console.log("More than one admins! Can exit");
        db.collection("groups")
          .doc(group_id)
          .update({
            admins: firebase.firestore.FieldValue.arrayRemove(
              currentUser.user_id
            ),
            members: newMembers,
            membersIdArray: firebase.firestore.FieldValue.arrayRemove(
              currentUser.user_id
            ),
          });
        this.props.hideGroupChatWindow();
      } else {
        // ? Zero or less admins *** will never reach this block
        console.log("No Admins! Something is wrong");
      }
    } else {
      console.log("Not an admin! Can Exit");
      db.collection("groups")
        .doc(group_id)
        .update({
          members: newMembers,
          membersIdArray: firebase.firestore.FieldValue.arrayRemove(
            currentUser.user_id
          ),
        });
      this.props.hideGroupChatWindow();
    }
  };

  handleEditgroupName = () => {
    this.setState({ editGroupName: true });
  };
  handleEditDescription = () => {
    this.setState({ editGroupDescription: true });
  };
  saveUpdatedName = () => {
    var dbRef = db.collection("groups").doc(this.props.group.group_id);
    dbRef
      .update({
        groupName: this.state.groupName,
      })
      .then(function () {
        console.log("Group name successfully updated!");
      })
      .catch(function (error) {
        console.error("Error updating Group name: ", error);
      });
    this.setState({ editGroupName: false });
  };
  saveUpdatedDescription = () => {
    var dbRef = db.collection("groups").doc(this.props.group.group_id);
    dbRef
      .update({
        description: this.state.description,
      })
      .then(function () {
        console.log("Group description updated!");
      })
      .catch(function (error) {
        console.error("Error updating Group description ", error);
      });
    this.setState({ editGroupDescription: false });
  };
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
    // setShowModal(!showModal);
  };

  render() {
    const user = this.props.user;
    const group = this.props.group;
    const { username, email, description: bio, profile_pic } = user || {};
    const {
      groupName,
      description,
      group_pic,
      admins,
      members,
      membersIdArray,
      createdAt,
      group_id,
    } = group || {};
    const createdAtDate = new Date(createdAt).toLocaleDateString();
    const createdAtTime = new Date(createdAt)
      .toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      })
      .toLocaleUpperCase();
    // console.log(group_pic);

    return (
      <>
        <div className="col-lg-3 col-md-4 col-sm-7 chat-side-bar p-0">
          <div className="sidebar">
            <div className="d-flex">
              <img
                className="pointer m-3"
                src={closeIcon}
                alt="close contact info"
                onClick={this.props.hideContactInfo}
              />
              <div className="m-3">{user ? "Contact" : "Group"} Info</div>
            </div>
            <div className="contact-info-container">
              <div className="bg-white">
                <div className="group-dp">
                  {group !== null ? (
                    <ImageUploader
                      textContent="CHANGE GROUP PROFILE PIC"
                      changePic={this.changeProfilePic}
                      imageSrc={group_pic || groupIcon}
                    />
                  ) : (
                    <img
                      className="rounded-circle m-4"
                      src={profile_pic || userIcon}
                      alt="profile pic of contact"
                      width="200px"
                      height="200px"
                    />
                  )}
                </div>
                {user ? (
                  <div className="contact-name text-left pl-4 pb-5 h5">
                    {username}
                  </div>
                ) : (
                  <div className="contact-name text-left px-4 pb-3 h5">
                    <div className="group-name">
                      {this.state.editGroupName ? (
                        <div className="edit-user-name d-flex justify-content-between">
                          <input
                            type="text"
                            name="groupName"
                            value={this.state.groupName || groupName}
                            className="form-control input-name"
                            onChange={this.handleInputChange}
                          />
                          <div
                            className="tick-icon"
                            onClick={this.saveUpdatedName}
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
                        <div className="show-user-name d-flex justify-content-between">
                          <div className="u-name">{groupName}</div>
                          <img
                            src={editIcon}
                            alt="group description"
                            onClick={this.handleEditgroupName}
                          />
                        </div>
                      )}
                    </div>
                    <span className="group-creation-date">{`Created ${createdAtDate} at ${createdAtTime}`}</span>
                  </div>
                )}
              </div>
              {group && (
                <div className="bg-white py-3 mb-2">
                  <div className="ml-4">
                    <div className="text-left green-text">
                      <span>Description</span>
                    </div>
                    {this.state.editGroupDescription ? (
                      <div className="edit-description pt-1 pr-4 text-left d-flex justify-content-between">
                        <div>
                          <input
                            type="text"
                            name="description"
                            value={this.state.description}
                            className="form-control input-name"
                            onChange={this.handleInputChange}
                          />
                        </div>
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
                      <div className="show-description pt-1 pr-4 text-left d-flex justify-content-between">
                        <div className="description-text mt-2">
                          {description || "Add group description"}
                        </div>
                        <img
                          src={editIcon}
                          alt="group description"
                          onClick={this.handleEditDescription}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="bg-white py-3 mb-2">
                <div className="text-left green-text px-4 d-flex justify-content-between">
                  <span>Media, Links and Docs</span>
                  <img
                    src={arrowIcon}
                    alt="click to see media, links and docs"
                  />
                </div>
                <div className="media-content py-4">
                  No media, Links and Docs
                </div>
              </div>
<!-- <<<<<<< feature/group/new -->
              <div className="bg-white pl-4 mb-2 text-left">
                <div className="py-3 d-flex justify-content-between align-items-center">
                  <span>Mute Notification</span>
                  <input className="mr-4" type="checkbox" />
                </div>
<!-- =======
            )}
            <div className="bg-white py-3 mb-2">
              <div className="text-left green-text px-4 d-flex justify-content-between">
                <span>Media, Links and Docs</span>
                <img src={arrowIcon} alt="click to see media, links and docs" />
              </div>
              <div className="media-content p-4">No media, Links and Docs</div>
            </div>
            <div className="bg-white pl-4 mb-2 text-left">
              <div className="py-3 d-flex justify-content-between align-items-center">
                <span>Mute Notification</span>
                <input className="mr-4" type="checkbox" />
              </div>
              <div className="py-3 d-flex justify-content-between top-border">
                <span>Starred Messages</span>
                <img
                  className="mr-4"
                  src={arrowIcon}
                  alt="click to see starred messages"
<!--                 /> -->
              </div>
               {group && (
// >>>>>>> feature/Groups -->
                <div className="py-3 d-flex justify-content-between top-border">
                  <span>Starred Messages</span>
                  <img
                    className="mr-4"
                    src={arrowIcon}
                    alt="click to see starred messages"
                  />
                </div>
                {group && (
                  <div className="py-3 d-flex justify-content-between top-border">
                    <span>Group Settings</span>
                    <img
                      className="mr-4"
                      src={arrowIcon}
                      alt="click to see starred messages"
                    />
                  </div>
                )}
              </div>
              {user ? (
                <>
                  <div className="bg-white pl-4 mb-2 text-left">
                    <div className="pt-2">
                      <div className="green-text">About and email address</div>
                      <div className="my-3 pr-2">{bio}</div>
                    </div>
                    <div className="py-3 top-border">{email}</div>
                  </div>
                  <div className="bg-white pl-4 mb-2 text-left pointer">
                    <div className="py-3">
                      <img
                        className="mr-4"
                        src={blockIcon}
                        alt="block contact"
                      />
                      <span>Block</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-white mb-2">
                  <div className="text-left green-text px-4 py-2 my-1 d-flex align-items-center justify-content-between">
                    <span>{members.length} participants</span>
                    <img src={searchIcon} alt="group description" />
                  </div>
                  {admins.includes(this.props.currentUser.user_id) && (
                    <>
                      <div
                        className="add-member-options"
                        onClick={this.toggleModal}
                      >
                        <div className="d-flex align-items-center">
                          <div className="add-members ml-2 rounded-circle d-flex align-items-center justify-content-center">
                            <img src={addMemberIcon} alt="contact" />
                          </div>
                        </div>
                        <div className="d-flex align-items-center w-100 ml-3 top-border">
                          <span>Add participant</span>
                        </div>
                      </div>
                      <div className="add-member-options">
                        <div className="d-flex align-items-center">
                          <div className="invite-via-link ml-2 rounded-circle d-flex align-items-center justify-content-center">
                            <img src={inviteLinkIcon} alt="contact" />
                          </div>
                        </div>
                        <div className="d-flex align-items-center w-100 ml-3 top-border">
                          <span>Invite to group via link</span>
                        </div>
                      </div>
                    </>
                  )}

                  {members.map((member) => {
                    const admin = admins.includes(member.user_id)
                      ? true
                      : false;
                    return (
                      <GroupMember
                        key={member.user_id}
                        user={member}
                        currentUser={this.props.currentUser}
                        admin={admin}
                      />
                    );
                  })}
                </div>
              )}
              {group && (
                <div
                  className="bg-white pl-4 mb-2 text-left text-danger pointer"
                  onClick={() => this.exitGroup}
                >
                  <div className="py-3">
                    <img className="mr-4" src={exitIcon} alt="delete contact" />
                    <span>Exit group</span>
                  </div>
                </div>
              )}
              <div className="bg-white pl-4 mb-2 text-left text-danger pointer">
                <div className="py-3">
                  <img className="mr-4" src={thumbDown} alt="report contact" />
                  <span>Report {user ? "contact" : "group"}</span>
                </div>
              </div>
              {user && (
                <div className="bg-white pl-4 mb-5 text-left text-danger pointer">
                  <div className="py-3">
                    <img
                      className="mr-4"
                      src={deleteIcon}
                      alt="delete contact"
                    />
                    <span>Delete contact</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {this.state.showModal && (
          <Modal
            exitModal={this.toggleModal}
            membersIdArray={membersIdArray}
            group_id={group_id}
            hideWindow={this.props.hideGroupChatWindow}
          />
        )}
      </>
    );
  }
}

export default ContactInfo;
