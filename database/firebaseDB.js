import * as firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyDHs5fvaOYZcyDdFyppfhVU-w75-hTmXE8",
    authDomain: "covid-safe-zoneapp.firebaseapp.com",
    projectId: "covid-safe-zoneapp",
    storageBucket: "covid-safe-zoneapp.appspot.com",
    messagingSenderId: "271676824758",
    appId: "1:271676824758:web:1be646331a276c6ff0da17",
    measurementId: "G-66961MXC0Z"
};

firebase.initializeApp(firebaseConfig);

export default firebase;