import React from "react";
import "../assets/styles/cards.css";
import traingle from "../assets/images/triangle-top-right3.png";

function messageTime(timestamp) {
  var date = new Date(timestamp);
  var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  hours = hours < 10 ? "0" + hours : hours;
  var am_pm = date.getHours() >= 12 ? "PM" : "AM";
  var minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  var time = hours + ":" + minutes + " " + am_pm;
  return <p className="sender-time"> {time} </p>;
}

function SenderCard(props) {
  return (
    <div
      className="cards card-sender mt-2"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="inner-parent sender border-bottom-card relative p-1">
        <span className="sender-msg">{props.message}</span>
        <span className="message-time relative">
          {messageTime(props.message_time)}
        </span>
      </div>
      <span className="sen">
        <img src={traingle} height="17px" width="15px" alt="cone" />
      </span>
    </div>
  );
}

export default SenderCard;
