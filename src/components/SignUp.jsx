import React, { Component } from 'react';
import firebase from '../services/firebase';
import Navbar from './Navbar';

class SignUp extends Component {
	state = {
		firstname: '',
		lastname: '',
		email: '',
		password: '',
		alert: false,
		alertType: '',
		alertMessage: ''
	};

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = event => {
		event.preventDefault();

		this.registerUser();
	};

	registerUser = () => {
		const firestore = firebase.firestore();
		const usersRef = firestore.collection('users');
		const { firstname, lastname, email, password } = this.state;

		if (firstname && lastname && email && password) {
			firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then(res => {
					usersRef
						.doc(res.user.uid)
						.set({
							user_id: res.user.uid,
							firstname,
							lastname,
							username: `${firstname} ${lastname}`,
							email,
							password,
							createdAt: new Date()
						})
						.then(() => {
							console.log(`Added user with email: ${res.user.email}`);
						})
						.catch(err => {
							this.signUpAlert(
								'danger',
								'Got an error: Account creation failed!'
							);
						});
				})
				.catch(err => {
					console.error(`Looks like an error: ${err}`);
					this.signUpAlert('danger', err.message);
				});
		} else {
			this.signUpAlert('danger', 'Input fields can not be empty');
		}
	};

	signUpAlert = (alertType, alertMessage) => {
		this.setState({
			alert: true,
			alertType,
			alertMessage
		});
	};

	render() {
		const {
			firstname,
			lastname,
			email,
			password,
			alert,
			alertType,
			alertMessage
		} = this.state;

		return (
			<>
				<Navbar />
				{alert && (
					<div className={`alert alert-${alertType} text-center`} role='alert'>
						{alertMessage}
					</div>
				)}
				<div className='form-container'>
					<div className='sign-up-form'>
						<form className='text-left p-4' onSubmit={this.handleSubmit}>
							<div className='form-group'>
								<input
									name='firstname'
									type='text'
									className='form-control'
									placeholder='First name'
									value={firstname}
									onChange={this.handleChange}
									autoComplete='off'
								/>
							</div>
							<div className='form-group'>
								<input
									name='lastname'
									type='text'
									className='form-control'
									placeholder='Last name'
									value={lastname}
									onChange={this.handleChange}
									autoComplete='off'
								/>
							</div>
							<div className='form-group'>
								<input
									name='email'
									type='email'
									className='form-control'
									placeholder='Email Address'
									value={email}
									onChange={this.handleChange}
									autoComplete='off'
								/>
								<small id='emailHelp' className='form-text text-muted'>
									Other users will be able to contact you using this email.
								</small>
							</div>
							<div className='form-group'>
								<input
									name='password'
									type='password'
									className='form-control'
									placeholder='Password'
									value={password}
									onChange={this.handleChange}
									autoComplete='off'
								/>
							</div>
							<button type='submit' className='btn btn-primary'>
								SIGN UP
							</button>
						</form>
					</div>
				</div>
			</>
		);
	}
}

export default SignUp;
