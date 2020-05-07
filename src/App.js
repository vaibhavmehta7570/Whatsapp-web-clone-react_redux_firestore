import React, { Component } from 'react';
import Home from './components/Home';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import firebase from './services/firebase';

class App extends Component {
	// TODO: move this to appropriate component
	componentDidMount() {
		const firestore = firebase.firestore();
		const usersRef = firestore.collection('users');

		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				usersRef.onSnapshot(
					users => {
						users.forEach(user => {
							console.log(user.data());
						});
					},
					err => {
						console.error(`Looks like an error => ${err.message}`);
					}
				);
			} else {
				console.log('User is not logged in');
			}
		});
	}

	render() {
		return (
			<BrowserRouter>
				<div className='App'>
					<Navbar />
					<Route exact path='/' component={Home} />
					<Route path='/signup' component={SignUp} />
					<Route path='/login' component={LogIn} />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
