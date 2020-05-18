import React from "react";
import user_default from "../../assets/images/users.svg";

function GroupContact({
  alreadyInGroup,
  selectMember,
  user,
}) {

  const { username, profile_pic } = user
  const handleClick = () => {
    if (!alreadyInGroup) {
      selectMember(user)
    }
  }

  return (
    <div>
      <div className="member-details d-flex pointer" onClick={handleClick}>
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
          <div className={`d-flex flex-column align-items-start ${alreadyInGroup ? "text-secondary" : ""}`}>
            <span>{username}</span>
            {alreadyInGroup && <small><em>Already added to group</em></small>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupContact;
