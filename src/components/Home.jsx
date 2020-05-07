import React, { Component } from 'react';
import logo from '../assets/images/logo.svg';

export default class Home extends Component {
	render() {
		return (
			<div>
				<div className='container'>
					<div className='row'>
						<div className='col-8'>
							<h1 className='title-english'>
								Welcome to the world of social networking
							</h1>
							<div className='title-hindi' level={2}>
								सोशल नेटवर्किंग की दुनिया में आपका स्वागत है
							</div>
						</div>
						<div className='col-4'>
							<img src={logo} alt='logo' width='400px' />
						</div>
					</div>
					<footer className='footer'>
						<p>
							Mountblue <i className='far fa-copyright blue'></i> Created with{' '}
							<i className='far fa-heart pink'></i> by{' '}
							<strong>Team Dumbledore</strong> (cohort-12){' '}
							<i className='fab fa-react fa-spin'></i>
						</p>
					</footer>
				</div>
			</div>
		);
	}
}
