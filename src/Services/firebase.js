import React from "react";
import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyA-1m04_DaYeOmyC1oWJYcYfVRWfhs8rz8",
    authDomain: "react-firebase-demo-b7686.firebaseapp.com",
    databaseURL: "https://react-firebase-demo-b7686.firebaseio.com",
    projectId: "react-firebase-demo-b7686",
    storageBucket: "react-firebase-demo-b7686.appspot.com",
    messagingSenderId: "625967249927",
    appId: "1:625967249927:web:7fb8de26befb3f438208a2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;