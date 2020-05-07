import React, { Component } from 'react';
import { connect } from 'react-redux';
import { db } from '../services/firebase';
import '../assets/styles/Chat.css';
import Contact from './Contact';
import user_default from '../assets/images/users.svg';
import TextBox from './TextBox';
import search from '../assets/images/search.svg';
import { getUsers } from '../actions/contactActions';
import { Link } from 'react-router-dom';
class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchString: '',
			searchedUsers: null
		};
	}
	componentDidMount() {
		db.collection('users')
			.get()
			.then(snapshot => {
				const users = [];
				snapshot.forEach(doc => {
					const data = doc.data();
					users.push(data);
				});
				this.props.getUsers(users);
			})
			.catch(error => console.log(error));
	}

	// TODO: handle search functionality in search contacts
	handelOnInputChange = event => {
		this.setState({ searchString: event.target.value }, () => {
			this.setState((state, props) => ({
				searchedUsers: props.users.filter(user =>
					user.username
						.toLowerCase()
						.includes(this.state.searchString.toLowerCase())
				)
			}));
		});
	};

	render() {
		return (
			<div className='chat-container'>
				<div className='sidebar'>
					<div className='user-detail mt-3 ml-4 mb-3'>
						<img src={user_default} alt='current-user-icon' height='40px' />
						<Link to='/'>
							<button
								type='button'
								className='logout-button btn btn-primary float-right mr-3'>
								Logout
							</button>
						</Link>
					</div>
					<div className='flex mb-2'>
						<input
							type='text'
							placeholder='Search..'
							className='search'
							onChange={this.handelOnInputChange}
						/>
						<img src={search} alt='search' className='search-icon' />
					</div>
					<div className='user_list'>
						{this.state.searchedUsers
							? this.state.searchedUsers.map(user => {
									return <Contact key={user.uid} users={user} />;
							  })
							: this.props.users.map(user => {
									return <Contact key={user.uid} users={user} />;
							  })}
					</div>
				</div>
				<div className='initial-text tc align-center'>
					<h1> Welcome!</h1>
					<h3> Let's connect to the world..</h3>
				</div>
				<TextBox />
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		users: state.users
	};
};
const mapDispatchToProps = dispatch => {
	return {
		getUsers: data => dispatch(getUsers(data))
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
