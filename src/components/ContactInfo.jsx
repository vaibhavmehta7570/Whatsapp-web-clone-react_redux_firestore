import React, { Component } from "react";
import firebase, { db } from "../services/firebase"
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
import GroupMember from "./groups/GroupMember";
import "../assets/styles/contactInfo.css";

const ContactInfo = ({ user, group, hideContactInfo, currentUser, hideGroupChatWindow }) => {
  const { username, email, description: bio, profile_pic } = user || {};
  const {
    groupName,
    description,
    group_pic,
    admins,
    members,
    createdAt,
    group_id
  } = group || {};

  const createdAtDate = new Date(createdAt).toLocaleDateString()
  const createdAtTime = new Date(createdAt).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  }).toLocaleUpperCase()

  const exitGroup = () => {
    console.log(currentUser)
    db.collection('groups').doc(group_id).get().then(doc => {
      if ( doc.exists) {
        const { admins, members } = doc.data()
        const newMembers = members.filter(member => member.user_id !== currentUser.user_id)
        console.log(newMembers)
        if (admins.includes(currentUser.user_id)) {

          if (admins.length === 1) {
            console.log("Only one admin! Sorry can't exit")
          } else if (admins.length >= 1) {
            console.log("More than one admins! Can exit")
            db.collection('groups').doc(group_id).update({
              admins: firebase.firestore.FieldValue.arrayRemove(currentUser.user_id),
              members: newMembers,
              membersIdArray: firebase.firestore.FieldValue.arrayRemove(currentUser.user_id),
            })
            hideGroupChatWindow()
          } else {
            // ? Zero or less admins *** will never reach this block
            console.log("No Admins! Something is wrong")
          }

        } else {
          console.log("Not an admin! Can Exit")
          db.collection('groups').doc(group_id).update({
            members: newMembers,
            membersIdArray: firebase.firestore.FieldValue.arrayRemove(currentUser.user_id),
          })
          hideGroupChatWindow()
        }
      }
    })
  }

  return (
    <div className="col-lg-3 col-md-4 col-sm-7 chat-side-bar p-0">
      <div className="sidebar">
        <div className="d-flex">
          <img
            className="pointer m-3"
            src={closeIcon}
            alt="close contact info"
            onClick={hideContactInfo}
          />
          <div className="m-3">{user ? "Contact" : "Group"} Info</div>
        </div>
        <div className="contact-info-container">
          <div className="bg-white">
            <img
              className="rounded-circle m-4"
              src={user ? profile_pic || userIcon : group_pic || groupIcon}
              alt="profile pic of contact"
              width="200px"
              height="200px"
            />
            {user ? (
              <div className="contact-name text-left pl-4 pb-5 h5">
                {username}
              </div>
            ) : (
              <div className="contact-name text-left px-4 pb-3 h5">
                <div className="d-flex justify-content-between">
                  {groupName}
                  <img src={editIcon} alt="group description" />
                </div>
                <span className="group-creation-date">{`Created ${createdAtDate} at ${createdAtTime}`}</span>
              </div>
            )}
          </div>
          {group && (
            <div className="bg-white py-3 mb-2">
              <div className="text-left green-text px-4">
                <span>Description</span>
              </div>
              <div className="px-4 text-left d-flex justify-content-between">
                <span className="description-text mt-2">
                  {description || "Add group description"}
                </span>
                <img src={editIcon} alt="group description" />
              </div>
            </div>
          )}
          <div className="bg-white py-3 mb-2">
            <div className="text-left green-text px-4 d-flex justify-content-between">
              <span>Media, Links and Docs</span>
              <img src={arrowIcon} alt="click to see media, links and docs" />
            </div>
            <div className="media-content py-4">No media, Links and Docs</div>
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
                  <img className="mr-4" src={blockIcon} alt="block contact" />
                  <span>Block</span>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white mb-2">
              <div className="text-left green-text px-4 py-2 my-1 d-flex align-items-center justify-content-between">
                <span>4 participants</span>
                <img src={searchIcon} alt="group description" />
              </div>
              {members.map(member => (
                <GroupMember key={member.user_id} user={member} />
              ))}
            </div>
          )}
          {group && (
            <div className="bg-white pl-4 mb-2 text-left text-danger pointer" onClick={exitGroup}>
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
                <img className="mr-4" src={deleteIcon} alt="delete contact" />
                <span>Delete contact</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
