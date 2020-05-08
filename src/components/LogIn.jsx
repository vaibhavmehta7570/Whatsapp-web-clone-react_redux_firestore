import React, { Component } from 'react';
import firebase from '../services/firebase';
import googleLogo from '../assets/images/google_logo.svg';
import Navbar from './Navbar';
import { userLoggedIn } from '../actions/authActions'
import { connect } from 'react-redux';

class LogIn extends Component {
	state = {
		email: '',
		password: '',
		alert: false,
		alertType: '',
		alertMessage: ''
	};

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	handleSignIn = event => {
		event.preventDefault();

		const { email, password } = this.state;

		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(res => {
				console.log('Sign In successful', res.user);
				this.signInAlert('success', 'Sign in successful');
				this.props.userLoggedIn(res.user)
			})
			.catch(err => {
				console.log(`Looks like an error: `, err);
				this.props.userLoggedIn(null)
				switch (err.code) {
					case 'auth/invalid-email':
						return this.signInAlert(
							'danger',
							'Invalid Email! Please enter a valid email address'
						);

					case 'auth/wrong-password':
						return this.signInAlert('danger', err.message);

					case 'auth/user-not-found':
						return this.signInAlert(
							'danger',
							'User Not Found! Kindly check your email address and try again'
						);

					default:
						return this.signInAlert(
							'danger',
							'Either the email or password is incorrect'
						);
				}
			})
			.finally(() => {
				setTimeout(() => {
					this.setState({
						alert: false
					});
				}, 3000);
			});
	};

	handleGoolgeSubmit = () => {
		const provider = new firebase.auth.GoogleAuthProvider();

		firebase
			.auth()
			.signInWithPopup(provider)
			.then(result => {
				this.props.userLoggedIn(result)
				if (result.additionalUserInfo.isNewUser) {
					const firestore = firebase.firestore();
					const usersRef = firestore.collection('users');
					const {
						email,
						given_name: firstname,
						family_name: lastname,
						picture
					} = result.additionalUserInfo.profile;

					usersRef
						.doc(result.user.uid)
						.set({
							user_id: result.user.uid,
							firstname,
							lastname,
							username: `${firstname} ${lastname}`,
							email,
							password: 'N/A',
							googleSignIn: true,
							profile_pic: picture,
							createdAt: new Date()
						})
						.then(() => {
							console.log('Google login success');
							this.signInAlert(
								'success',
								'Your account has been successfully created using Google'
							);
						})
						.catch(err => {
							console.error(`Looks like an error: ${err}`);
							this.signInAlert('danger', err.message);
							this.props.userLoggedIn(null)
						})
						.finally(() => {
							setTimeout(() => {
								this.setState({ alert: false });
							}, 3000);
						});
				} else {
					// TODO: directly redirect to chatscreen
					this.signInAlert('success', 'Login successful using Google Account');
				}
			})
			.catch(err => {
				this.props.userLoggedInError(err)
				console.error(`Looks like an error: ${err}`);
				this.signInAlert('danger', err.message);
			})
			.finally(() => {
				setTimeout(() => {
					this.setState({ alert: false });
				}, 3000);
			});
	};

	signInAlert = (alertType, alertMessage) => {
		this.setState({
			alert: true,
			alertType,
			alertMessage
		});
	};

	render() {
		const { email, password, alert, alertType, alertMessage } = this.state;

		return (
			<>
				<Navbar />
				{alert && (
					<div className={`alert alert-${alertType} text-center`} role='alert'>
						{alertMessage}
					</div>
				)}
				<div className='form-container'>
					<div className='login-form'>
						<form onSubmit={this.handleSignIn}>
							<div className='form-group'>
								<label htmlFor='email'>Email address</label>
								<input
									type='email'
									className='form-control'
									id='email'
									value={email}
									onChange={this.handleChange}
									placeholder='Please enter your email'
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='password'>Password</label>
								<input
									type='password'
									className='form-control'
									id='password'
									value={password}
									onChange={this.handleChange}
									placeholder='Please enter your password'
								/>
							</div>
							<button type='submit' className='btn btn-primary'>
								SIGN IN
							</button>
							<div className='btn ml-4'>
								<img
									src={googleLogo}
									alt='sign up with google'
									width='40px'
									onClick={this.handleGoolgeSubmit}
								/>
							</div>
						</form>
					</div>
				</div>
			</>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	userLoggedIn: (data) => dispatch(userLoggedIn(data)),
})

export default connect(null, mapDispatchToProps)(LogIn);
