import React, { Component } from "react";
import user_default from "../../assets/images/users.svg";
import firebase, { db } from "../../services/firebase";

class GroupMember extends Component {
  state = {
    showDropdown: false,
  };

  handleButtonClick = () => {
    this.setState(state => ({ showDropdown: !state.showDropdown }));
  };

  hideDropdown = () => {
    this.setState({ showDropdown: false });
  };

  removeMember = () => {
    const {
      group_id,
      user: { user_id },
    } = this.props;

    db.collection("groups")
      .doc(group_id)
      .get()
      .then(doc => {
        const newMembers = doc
          .data()
          .members.filter(member => member.user_id !== user_id);

        db.collection("groups")
          .doc(group_id)
          .update({
            members: newMembers,
            membersIdArray: firebase.firestore.FieldValue.arrayRemove(user_id),
            admins: firebase.firestore.FieldValue.arrayRemove(user_id),
          })
          .catch(err => console.error("Error removing member: ", err));
      }).catch(err => console.error("Error removing member: ", err));
  };

  makeGroupAdmin = () => {
    const {
      group_id,
      user: { user_id },
    } = this.props;

    db.collection("groups")
      .doc(group_id)
      .update({
        admins: firebase.firestore.FieldValue.arrayUnion(user_id),
      })
      .catch(err => console.error("Error making group admin: ", err));

    this.hideDropdown();
  };

  dismissAsAdmin = () => {
    const {
      group_id,
      user: { user_id },
    } = this.props;

    db.collection("groups")
      .doc(group_id)
      .update({
        admins: firebase.firestore.FieldValue.arrayRemove(user_id),
      })
      .catch(err => console.error("Error dismissing admin: ", err));

    this.hideDropdown();
  }

  render() {
    const {
      user: { profile_pic, username, user_id } = {},
      currentUser: { user_id: currentUserId } = {},
      isAdmin,
      isCurrentUserAdmin,
    } = this.props;

    const { showDropdown } = this.state;

    return (
      <div className="container-contact users">
        <div className="user-dp d-flex align-items-center ml-2">
          <img
            className="rounded-circle"
            src={profile_pic || user_default}
            height="50px"
            width="50px"
            alt="contact"
          />
        </div>
        <div className="d-flex align-items-center justify-content-between w-100 ml-3 top-border">
          <span>{user_id === currentUserId ? "You" : username}</span>
          <div className="h-100 d-flex align-items-center">
            {isAdmin && (
              <span className="admin-badge px-1 mr-3">Group admin</span>
            )}
            {isCurrentUserAdmin && user_id !== currentUserId && (
              <div
                className="container-drop align-items-center"
                tabIndex="1"
                onBlur={this.hideDropdown}
              >
                <img
                  type="button"
                  src="https://img.icons8.com/android/24/000000/expand-arrow.png"
                  alt="down arrow"
                  className="down-arrow mr-3"
                  onClick={this.handleButtonClick}
                />
                {showDropdown && (
                  <div className="dropdown-member">
                    <ul>
                      {!isAdmin && (
                        <li className="py-3" onClick={this.makeGroupAdmin}>
                          Make group admin
                        </li>
                      )}
                      <li className="py-3" onClick={this.removeMember}>
                        Remove
                      </li>
                      {isAdmin && (
                        <li className="py-3" onClick={this.dismissAsAdmin}>
                          Dismiss as admin
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default GroupMember;
