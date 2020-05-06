import React from 'react';
import Chat from './components/Chat';
import './App.css';
import {Provider} from "react-redux";
import store from "./store";


function App() {
	return (
		<Provider store={store}>
			<div className='App'>
				<Chat />
			</div>
		</Provider>
	);
}

export default App;
