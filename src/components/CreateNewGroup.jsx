import React, { Component } from "react";
import "../assets/styles/createNewgroups.css";
import { getUsers } from "../actions/contactActions";
import { connect } from "react-redux";
import ContactForGroup from "./ContactForGroup";

class CreateNewGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersForGroup: [],
      sortedUsers: [],
      searchUser: false,
      searchString: "",
    };
  }
  componentDidMount() {
    let userArr = this.props.users;
    console.log(userArr);
    userArr.sort(function (a, b) {
      var UnameA = a.username.toLowerCase();
      var UnameB = b.username.toLowerCase();

      if (UnameA < UnameB) {
        return -1;
      }
      if (UnameA > UnameB) {
        return 1;
      }
      return 0;
    });
    console.log(userArr);
    this.setState({ sortedUsers: userArr });
  }
  SearchUser = (e) => {
    // let searchStr = e.target.value;
    this.setState({ searchUser: true, searchString: e.target.value }, () => {
      this.setState({
        usersForGroup: this.state.sortedUsers.filter((groupUser) => {
          //   console.log(this.state.searchString);
          return groupUser.username
            .toLowerCase()
            .includes(this.state.searchString.toLowerCase());
        }),
      });
    });
  };

  render() {
    console.log(this.state.usersForGroup);
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
            <div className="header-title">Add group participants</div>
          </div>
        </header>

        <div className="group-pane-body">
          <div className="search-group-user mt-4 ml-4 mb-5">
            <input
              type="text"
              className=" group-search"
              placeholder="Type contact name"
              onChange={this.SearchUser}
            />
          </div>

          <div className="group-contact-list">
            {this.state.searchUser
              ? this.state.usersForGroup.map((user) => (
                  <ContactForGroup key={user.user_id} users={user} />
                ))
              : this.state.sortedUsers.map((user) => (
                  <ContactForGroup key={user.user_id} users={user} />
                ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (data) => dispatch(getUsers(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewGroup);
