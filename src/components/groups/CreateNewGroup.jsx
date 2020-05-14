import React, { Component } from "react";
import "../../assets/styles/createNewgroups.css";
import SelectGroupMembers from "./SelectGroupMembers";
import AddGroupSubject from "./AddGroupSubject";

class CreateNewGroup extends Component {
  state = {
    nextPage: false,
  };

  gotoNextPage = () => {
    this.setState(state => ({ nextPage: !state.nextPage}))
  }

  render() {
    const { nextPage } = this.state;
    return (
      <>
        {nextPage ? (
          <AddGroupSubject handleGoBack={this.gotoNextPage} />
        ) : (
          <SelectGroupMembers handleGoBack={this.props.handleGoBack} gotoNextPage={this.gotoNextPage} />
        )}
      </>
    );
  }
}

export default CreateNewGroup;
