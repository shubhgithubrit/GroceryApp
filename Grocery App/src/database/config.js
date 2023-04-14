import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyAci3Db9w5ndDRp5vwZUbmWiUKUjMtXdC0",
  authDomain: "newprojectstore-3c220.firebaseapp.com",
  databaseURL: "https://newprojectstore-3c220-default-rtdb.firebaseio.com",
  projectId: "newprojectstore-3c220",
  storageBucket: "newprojectstore-3c220.appspot.com",
  messagingSenderId: "845739299006",
  appId: "1:845739299006:web:22827e117bfe1038958eef",
  measurementId: "G-6C62KJEZ44"
};
firebase.initializeApp(firebaseConfig);

let database = firebase.database();
 export {database};

