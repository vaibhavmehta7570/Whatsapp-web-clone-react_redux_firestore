import React, { Component } from "react";
import firebase, { db, storage } from "../../services/firebase";
import Header from "./Header";
import ImageUploader from "../ImageUploader";
import gruopIcon from "../../assets/images/group-default-icon.svg";
import checkIcon from "../../assets/images/check.svg";
import { connect } from "react-redux";
import { getGroupName, getGroupPic } from "../../actions/createGroupAction";

class AddGroupSubject extends Component {
  state = {
    groupName: "",
    uploadedImage: null,
    groupImage: null,
  };

  handleGroupNameChange = event => {
    this.setState({ groupName: event.target.value }, () => {
      this.props.getGroupName(this.state.groupName);
    });
  };

  handleChangePic = event => {
    let file = event.target.files[0];
    let reader = new FileReader();

    this.setState({ groupImage: file });

    reader.readAsDataURL(file);

    reader.onload = () => {
      this.setState({ uploadedImage: reader.result });
    };

    reader.onerror = () => {
      console.error(reader.error);
    };
  };

  handleSubmit = event => {
    event.preventDefault();
    this.createGroup(this.props.groupInfo);
    this.props.exitGroupCreation();
  };

  createGroup = groupInfo => {
    const groupsDocRef = db.collection("groups").doc();

    groupsDocRef
      .set({...groupInfo, group_id: groupsDocRef.id, createdAt: new Date().getTime()})
      .then(() => {
        groupInfo.members.forEach(member => {
          db.doc(`users/${member.user_id}`)
            .update({
              groups: firebase.firestore.FieldValue.arrayUnion(groupsDocRef.id),
            })
            .then(() => {
              this.props.updateProgress("Group created!");
              this.uploadGroupImage(groupsDocRef);
            })
            .catch(err => console.error('Error while creating group: ', err));
        })
      })
      .catch(err => console.error("Error while creating group: ", err));
  };

  uploadGroupImage = groupsDocRef => {
    const { groupImage } = this.state;

    if (groupImage) {
      const imageLocationRef = storage
        .ref() //ref to the firebase storage
        .child(`groupProfileImages/${groupsDocRef.id}/${groupImage.name}`); // ref to a location in firebase storage

      imageLocationRef
        .put(groupImage) // uploads the image to the location
        .then(snapshot => {
          this.props.updateProgress("Group image uploaded!");
          imageLocationRef.getDownloadURL().then(imageURL => {
            this.updateGroupPic(groupsDocRef, imageURL);
          });
        })
        .catch(err =>
          console.error("Error while uploading group image: ", err)
        );
    } else {
      setTimeout(() => {
        this.props.updateProgress("");
      }, 2000); // remove the alert after 2 seconds
    }
  };

  updateGroupPic = (groupsDocRef, imageURL) => {
    groupsDocRef
      .update({
        group_pic: imageURL,
      })
      .then(() => {
        this.props.getGroupPic(imageURL);
        this.props.updateProgress("Group image updated!");

        setTimeout(() => {
          this.props.updateProgress("");
        }, 2000); // remove the alert after 2 seconds
      })
      .catch(err => console.error("Error while updating group image: ", err));
  };

  render() {
    const { groupName, uploadedImage } = this.state;

    return (
      <div className="sidebar">
        <Header heading="New group" handleGoBack={this.props.handleGoBack} />

        <ImageUploader
          textContent="ADD GROUP ICON"
          imageSrc={uploadedImage || gruopIcon}
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
            autoFocus
          />
          {groupName && (
            <button type="submit" className="create-group-btn">
              <div
                className="create-group p-2 rounded-circle mt-5"
                onClick={this.handleSubmit}
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

const mapStateToProps = ({ groupInfo }) => ({
  groupInfo,
});

const mapDispatchToProps = dispatch => ({
  getGroupName: groupName => dispatch(getGroupName(groupName)),
  getGroupPic: groupPic => dispatch(getGroupPic(groupPic)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddGroupSubject);
