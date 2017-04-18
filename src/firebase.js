import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAjomoU-w65C7BXGYZOvOHq89pCZCSBlX0",
    authDomain: "goalcoach-769cc.firebaseapp.com",
    databaseURL: "https://goalcoach-769cc.firebaseio.com",
    projectId: "goalcoach-769cc",
    storageBucket: "goalcoach-769cc.appspot.com",
    messagingSenderId: "109541310990"
  };


export const firebaseApp = firebase.initializeApp(config);