import React, { Component } from "react";
import { connect } from "react-redux";
import ContactForGroup from "./ContactForGroup";
import GroupMember from "./GroupMember";
import createGroupLogo from "../../assets/images/arrow-right.svg";
import Header from "./Header";
import { getGroupMembers } from "../../actions/createGroupAction"

class SelectGroupMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedUsersForGroup: [],
      sortedUsers: [],
      searchUser: false,
      searchString: "",
      groupMembers: [],
    };
  }

  componentDidMount() {
    let userArr = this.props.users;
    this.setState({ sortedUsers: this.sortUsers(userArr) });
  }

  sortUsers = (usersArray) => {
    return usersArray.sort((userA, userB) =>
      userA.username.toLowerCase() < userB.username.toLowerCase() ? -1 : 1
    );
  };

  SearchUser = (e) => {
    this.setState({ searchUser: true, searchString: e.target.value }, () => {
      this.setState({
        searchedUsersForGroup: this.state.sortedUsers.filter((groupUser) => {
          return groupUser.username
            .toLowerCase()
            .includes(this.state.searchString.toLowerCase());
        }),
      });
    });
  };

  addUserToGroup = (user) => {
    this.setState((state) => ({
      groupMembers: [...state.groupMembers, user],
      sortedUsers: state.sortedUsers.filter(
        (sortedUser) => sortedUser.user_id !== user.user_id
      ),
      searchedUsersForGroup: state.searchedUsersForGroup.filter(
        (groupUser) => groupUser.user_id !== user.user_id
      ),
    }));
  };

  removeUserFromGroup = (user) => {
    this.setState((state) => ({
      groupMembers: state.groupMembers.filter(
        (groupMember) => groupMember.user_id !== user.user_id
      ),
      sortedUsers: this.sortUsers([...state.sortedUsers, user]),
      searchedUsersForGroup: this.sortUsers([
        ...state.searchedUsersForGroup,
        user,
      ]),
    }));
  };

  submitGroupMembers = () => {
    this.props.gotoNextPage()
    this.props.getGroupMembers(this.state.groupMembers)
  }

  render() {
    return (
      <div className="sidebar">
        <Header
          heading="Add group participants"
          handleGoBack={this.props.handleGoBack}
        />

        <div className="group-pane-body">
          <div className="search-group-user mt-4 ml-4 mb-3">
            {this.state.groupMembers.map((groupMember) => {
              return (
                <GroupMember
                  key={groupMember.user_id}
                  user={groupMember}
                  removeMember={this.removeUserFromGroup}
                />
              );
            })}
            <input
              type="text"
              className="group-search mt-2"
              placeholder="Type contact name"
              onChange={this.SearchUser}
              autoFocus
            />
          </div>

          <div className="group-contact-list">
            {this.state.searchUser
              ? this.state.searchedUsersForGroup.map((user) => (
                  <ContactForGroup
                    key={user.user_id}
                    users={user}
                    onClickUser={this.addUserToGroup}
                  />
                ))
              : this.state.sortedUsers.map((user) => (
                  <ContactForGroup
                    key={user.user_id}
                    users={user}
                    onClickUser={this.addUserToGroup}
                  />
                ))}
          </div>
          <div className="create-group-container d-flex align-items-center justify-content-center">
            {this.state.groupMembers.length > 0 && (
              <div
                className="create-group p-2 rounded-circle"
                onClick={this.submitGroupMembers}
              >
                <img src={createGroupLogo} alt="create group" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({users}) => {
  return {
    users
  };
};

const mapDispatchToProps = dispatch => ({
  getGroupMembers: groupMembers => dispatch(getGroupMembers(groupMembers))
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectGroupMembers);
