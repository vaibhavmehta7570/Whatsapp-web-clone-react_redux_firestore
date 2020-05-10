import React from "react";
import user_default from "../assets/images/users.svg";
import "../assets/styles/Chat.css";
const Contact = (props) => {
  // ? Class to apply custom css to the user currently chatting with
  const active = props.userToChatWith
    ? props.userToChatWith.user_id === props.users.user_id
      ? "active"
      : ""
    : "";

  return (
    <div
      className={`users ${active}`}
      onClick={() => props.onClickUser(props.users)}
    >
      <div className="user-dp d-flex align-items-center ml-2">
        <img
          className="rounded-circle"
          src={props.users.profile_pic || user_default}
          height="50px"
          alt="contact"
        />
      </div>
      <div className="d-flex align-items-center w-100 ml-3 bottom-border">
        <span>{props.users.username}</span>
      </div>
    </div>
  );
};
export default Contact;
