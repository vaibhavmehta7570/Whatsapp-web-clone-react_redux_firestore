import React from "react";
import "../CSS/cards.css";

function SenderCard(props) {
  return (
    <div className="cards sender" style={{ backgroundColor: "orange" }}>
      <p style={{ padding: "5px 5px 5px 5px" }}>{props.message}</p>
    </div>
  );
}
export default SenderCard;
