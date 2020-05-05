import * as firebase from 'firebase';

const firebaseConfig = {
	apiKey: 'AIzaSyCVEK6AVofB9GA2aihbQIOpMKRq_kyP9uY',
	authDomain: 'whatsapp-clone-625c6.firebaseapp.com',
	databaseURL: 'https://whatsapp-clone-625c6.firebaseio.com',
	projectId: 'whatsapp-clone-625c6',
	storageBucket: 'whatsapp-clone-625c6.appspot.com',
	messagingSenderId: '582837277034',
	appId: '1:582837277034:web:1a80f3391735ceec6e5513'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
