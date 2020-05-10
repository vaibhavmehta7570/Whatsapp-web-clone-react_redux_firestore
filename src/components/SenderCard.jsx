import React from 'react';
import '../assets/styles/cards.css';
import traingle from '../assets/images/triangle-top-right3.png';
function messageTime(timestamp){
	var date = new Date(timestamp);
	var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
	var am_pm = date.getHours() >= 12 ? "PM" : "AM";
	hours = hours < 10 ? "0" + hours : hours;
	var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	var time = hours + ":" + minutes + " " + am_pm;
	return <p className="sender-time"> {time} </p>
}
function SenderCard(props) {
	return (
		<div
			className='cards card-sender mt-2'
			style={{ backgroundColor: 'transparent' }}>
			<div className='inner-parent sender'>
				{/* <p className="sender_username">~You</p> */}
				<p className="sender-msg"style={{}}>{props.message}</p>
				{messageTime(props.message_time)}
			</div>
			<span className='sen'>
				<img src={traingle} height='17px' width='15px' alt='cone' />
				
			</span>
		</div>
	);
}
export default SenderCard;
