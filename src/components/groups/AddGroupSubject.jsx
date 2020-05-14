import React, { Component } from "react";
import Header from "./Header";
import ImageUploader from "../ImageUploader";
import gruopIcon from "../../assets/images/group-default-icon.svg";
import checkIcon from "../../assets/images/check.svg";

class AddGroupSubject extends Component {
  state = {
    groupName: "",
  };

  handleGroupNameChange = (event) => {
    this.setState({ groupName: event.target.value });
  };

  handleChangePic = (event) => {
    console.log(event.target.files[0]);
  };

  handleSubmit = event => {
    event.preventDefault()
    console.log(this.state.groupName)
  }


  render() {
    const { groupName } = this.state;

    return (
      <div className="sidebar">
        <Header heading="New group" handleGoBack={this.props.handleGoBack} />

        <ImageUploader
          textContent="ADD GROUP ICON"
          imageSrc={gruopIcon}
          changePic={this.handleChangePic}
        />

        <form
          className="d-flex flex-column align-items-center justify-content-center mt-5"
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            className="group-name-input align-self-end"
            placeholder="Group subject"
            value={groupName}
            onChange={this.handleGroupNameChange}
          />
          {groupName && (
            <button type="submit" className="btn">
              <div
                className="create-group p-2 rounded-circle mt-5"
                // onClick={this.props.gotoNextPage}
              >
                <img src={checkIcon} alt="create group" className="m-1" />
              </div>
            </button>
          )}
        </form>
      </div>
    );
  }
}

export default AddGroupSubject;
