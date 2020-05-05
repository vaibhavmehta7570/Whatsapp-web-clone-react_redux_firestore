import React from "react";
import "../CSS/cards.css";

function ReceiverCard(props) {
  // console.log(props);
  // console.log(props.message);
  return (
    <div className="cards">
      <p style={{ padding: "5px 5px 5px 5px" }}>{props.message}</p>
    </div>
  );
}
export default ReceiverCard;
