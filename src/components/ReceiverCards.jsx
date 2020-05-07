import React from 'react';
import '../assets/styles/cards.css';
import traingle from '../assets/images/triangle-top-right.svg';

function ReceiverCard(props) {
	return (
		<div className='cards mt-2' style={{ backgroundColor: 'transparent' }}>
			<span className='rec'>
				<img src={traingle} height='15px' width='25px' alt='cone' />
			</span>
			<div className='inner-parent receiver'>
				<p style={{ padding: '5px 20px 5px 5px' }}>{props.message}</p>
			</div>
		</div>
	);
}
export default ReceiverCard;
