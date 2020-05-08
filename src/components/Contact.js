import React from "react";
import user_default from "../assets/images/users.svg";
import "../assets/styles/Chat.css";
const Contact = (props) => {
  return (
    <div className="users" onClick={() => props.onClickUser(props.users)}>
      <div className="user-dp mt-2 ml-2">
        <img src={user_default} height="40px" alt="contact" />
      </div>
      <div className="users-name">
        <p className="userName mt-3">{props.users.username}</p>
      </div>
    </div>
  );
};
export default Contact;
