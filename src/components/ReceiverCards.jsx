import React from "react";
import "../assets/styles/cards.css";
import traingle from "../assets/images/triangle-top-right.svg";
function messageTime(timestamp) {
  var date = new Date(timestamp);
  var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  var am_pm = date.getHours() >= 12 ? "PM" : "AM";
  hours = hours < 10 ? "0" + hours : hours;
  var minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var time = hours + ":" + minutes + " " + am_pm;
  return <p className="receiver-time"> {time} </p>;
}
function ReceiverCard(props) {
  return (
    <div className="cards mt-2" style={{ backgroundColor: "transparent" }}>
      <span className="rec">
        <img src={traingle} height="15px" width="25px" alt="cone" />
      </span>
      <div className="inner-parent receiver">
        <p className="username">~{props.username}</p>
        <p className="receive-msg">{props.message}</p>
        {messageTime(props.message_time)}
      </div>
    </div>
  );
}
export default ReceiverCard;
