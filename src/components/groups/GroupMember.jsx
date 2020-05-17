import React from "react";
import user_default from "../../assets/images/users.svg";

function GroupMember({user: {profile_pic, username }}) {
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
      <div className="d-flex align-items-center w-100 ml-3 top-border">
        <span>{username}</span>
      </div>
    </div>
  );
}

export default GroupMember;
