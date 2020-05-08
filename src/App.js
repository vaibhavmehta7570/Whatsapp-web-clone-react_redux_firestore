import React, { Component } from 'react';
import Chat from './components/Chat';
import Home from './components/Home';
import { BrowserRouter, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Route exact path='/' component={Home} />
					<Route path='/signup' component={SignUp} />
					<Route path='/login' component={LogIn} />
					<Route path='/chat' component={Chat} />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
