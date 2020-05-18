import React, { Component } from "react";
import { connect } from "react-redux";
import firebase, { db } from "../../services/firebase";
import GroupContact from "./GroupContact";
import GroupMemberCard from "./GroupMemberCard";
import {
  getSearchedMembers,
  removeGroupMember,
  addGroupMember,
} from "../../actions/searchGroupMembersActions";
import checkIcon from "../../assets/images/check.svg";
import "../../assets/styles/modal.css";

class Modal extends Component {
  state = {
    searchValue: "",
    newMembersList: [],
    sortedMembers: [],
    selectedMembers: [],
  };

  componentDidMount() {
    let membersArr = [...this.props.users];
    this.setState({ sortedMembers: this.sortUsers(membersArr) });
  }

  sortUsers = usersArray => {
    return usersArray.sort((userA, userB) =>
      userA.username.toLowerCase() < userB.username.toLowerCase() ? -1 : 1
    );
  };

  handleChange = event => {
    this.setState({ searchValue: event.target.value }, () => {
      const searchedMembers = this.state.sortedMembers.filter(user =>
        user.username
          .toLowerCase()
          .includes(this.state.searchValue.toLowerCase())
      );
      this.props.getSearchedMembers(searchedMembers);
    });
  };

  alreadyGroupMember = contact => {
    if (this.props.membersIdArray.includes(contact.user_id)) {
      return true;
    }
    return false;
  };

  selectMember = user => {
    this.setState(state => ({
      selectedMembers: [...state.selectedMembers, user],
      sortedMembers: state.sortedMembers.filter(
        sortedMember => sortedMember.user_id !== user.user_id
      ),
    }));
    removeGroupMember(user);
  };

  deSelectMember = user => {
    this.setState(state => ({
      selectedMembers: state.selectedMembers.filter(
        member => member.user_id !== user.user_id
      ),
      sortedMembers: this.sortUsers([...state.sortedMembers, user]),
    }));
    addGroupMember(user);
  };

  addMemberToGroup = () => {
    const { selectedMembers } = this.state;
    const { group_id, hideWindow } = this.props;
    const membersIDs = selectedMembers.map(member => member.user_id);

    db.doc(`groups/${group_id}`)
      .update({
        members: firebase.firestore.FieldValue.arrayUnion(...selectedMembers),
        membersIdArray: firebase.firestore.FieldValue.arrayUnion(...membersIDs),
      })
      .then(() => {
        console.log("Members added successfully");
        hideWindow()
      })
      .catch(err => console.error("Members not added: ", err));
  };

  render() {
    const { searchedGroupMembers, exitModal } = this.props;
    const { searchValue, sortedMembers, selectedMembers } = this.state;

    return (
      <div className="overlay">
        <div className="d-flex justify-content-center align-items-center h-100">
          <div className="add-members-modal">
            <div className="add-participants d-flex justify-content-start px-4 py-3">
              <svg
                className="pointer"
                onClick={exitModal}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  fill="#ddd"
                  d="M19.1 17.2l-5.3-5.3 5.3-5.3-1.8-1.8-5.3 5.4-5.3-5.3-1.8 1.7 5.3 5.3-5.3 5.3L6.7 19l5.3-5.3 5.3 5.3 1.8-1.8z"
                ></path>
              </svg>
              <span className="ml-4">Add participants</span>
            </div>
            <div className="search-bar-container py-2 px-3">
              <div className="search-input-div pl-2 d-flex align-items-center">
                <svg
                  className="ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                >
                  <path
                    fill="#aaa"
                    d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"
                  ></path>
                </svg>
                <input
                  type="text"
                  className="search-input w-100 ml-3 px-2"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="contact-list d-flex flex-column w-100">
              <div className="seperator d-flex flex-wrap pt-3 pb-1 px-4">
                {selectedMembers.map(groupMember => (
                  <GroupMemberCard
                    key={groupMember.user_id}
                    user={groupMember}
                    removeMember={this.deSelectMember}
                  />
                ))}
              </div>
              <div className="contacts-container d-flex flex-column w-100">
                {!(searchValue && searchedGroupMembers.length === 0) && (
                  <div className="contact-list-header p-4 text-left">
                    CONTACTS
                  </div>
                )}

                {searchValue
                  ? searchedGroupMembers.map(user => {
                      const alreadyInGroup = this.alreadyGroupMember(user);
                      return (
                        <GroupContact
                          key={user.user_id}
                          user={user}
                          alreadyInGroup={alreadyInGroup}
                          selectMember={this.selectMember}
                        />
                      );
                    })
                  : sortedMembers.map(user => {
                      const alreadyInGroup = this.alreadyGroupMember(user);
                      return (
                        <GroupContact
                          key={user.user_id}
                          user={user}
                          alreadyInGroup={alreadyInGroup}
                          selectMember={this.selectMember}
                        />
                      );
                    })}

                {selectedMembers.length > 0 && (
                  <button type="submit" className="add-members-btn">
                    <div
                      className="add-group-members rounded-circle"
                      onClick={this.addMemberToGroup}
                    >
                      <img src={checkIcon} alt="add-members" className="m-1" />
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users, searchedGroupMembers }) => ({
  users,
  searchedGroupMembers,
});

const mapDispatchToProps = dispatch => ({
  getSearchedMembers: members => dispatch(getSearchedMembers(members)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
