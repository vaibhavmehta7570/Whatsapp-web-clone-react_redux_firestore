import React from "react";
import "../assets/style/cards.css";
import traingle from "../assets/images/triangle-top-right3.png";

function SenderCard(props) {
  return (
    <div
      className="cards card-sender mt-2"
      style={{ backgroundColor: "transparent" }}
    >
      <div className="inner-parent sender">
        <p style={{ padding: "5px 20px 5px 5px" }}>{props.message}</p>
      </div>
      <span className="sen">
        <img src={traingle} height="17px" width="15px" alt="cone" />
      </span>
    </div>
  );
}
export default SenderCard;
