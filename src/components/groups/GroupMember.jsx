import React from "react";
import userIcon from "../../assets/images/users.svg";
import closeIcon from "../../assets/images/close-icon.svg";
import "../../assets/styles/groupMember.css";

function GroupMember({ user, removeMember }) {
  return (
    <div className="group-member-thumbnail my-1 d-flex align-items-center">
      <img
        className="rounded-circle"
        src={user.profile_pic || userIcon}
        alt="user profile pic"
        height="26px"
        width="26px"
      />
      <span className="mx-2">{user.username}</span>
      <div
        className="d-flex align-items-center justify-content-center rounded-circle remove-group-member m-1"
        onClick={() => removeMember(user)}
      >
        <img
          className="rounded-circle"
          src={closeIcon}
          alt="remove member"
          height="15px"
          width="15px"
        />
      </div>
    </div>
  );
}

export default GroupMember;
