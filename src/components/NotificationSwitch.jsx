import React from "react";
import notificationIcon from "../assets/images/notification.svg";
import "../assets/styles/notificationSwitch.css";

function NotificationSwitch() {
  return (
    <div className="notification-div d-flex align-items-center p-3 pointer">
      <span className="notification-icon-container rounded-circle d-flex justify-content-center align-items-center mr-3">
        <img src={notificationIcon} alt="notification icon" width="20px" />
      </span>
      <div className="text-left">
        <h6 className="m-0">Get notified of new messages</h6>
        <span className="notification-link">Turn on desktop notifications</span>
      </div>
    </div>
  );
}

export default NotificationSwitch;
