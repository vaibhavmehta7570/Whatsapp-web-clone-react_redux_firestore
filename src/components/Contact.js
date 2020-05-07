import React from 'react';
import user_default from '../assets/images/users.svg';
import '../assets/styles/Chat.css';
const Contact = props => {
	return (
		<div className='users'>
			<div className='inline-block pl-3'>
				<img src={user_default} alt='contact' />
			</div>
			<div className='inline-block'>
				<p className='userName mt-2'>Name: {props.users.username}</p>
			</div>
		</div>
	);
};
export default Contact;
