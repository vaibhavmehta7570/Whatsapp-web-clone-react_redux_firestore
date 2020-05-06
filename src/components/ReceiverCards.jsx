import React from "react";
import "../assets/style/cards.css";

function ReceiverCard(props) {
  return (
    <div className="cards">
      <p style={{ padding: "5px 5px 5px 5px" }}>{props.message}</p>
    </div>
  );
}
export default ReceiverCard;
