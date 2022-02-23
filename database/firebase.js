import * as firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyBnVefJiIGBvnk5-nvayJvY69mv4AdLHWU",
    authDomain: "covid-safe-zoneapp-2.firebaseapp.com",
    projectId: "covid-safe-zoneapp-2",
    storageBucket: "covid-safe-zoneapp-2.appspot.com",
    messagingSenderId: "290513368626",
    appId: "1:290513368626:web:017d6c5199962aa701ae2b",
    measurementId: "G-3JGVDBJZFG"
};

firebase.initializeApp(firebaseConfig);

export default firebase;