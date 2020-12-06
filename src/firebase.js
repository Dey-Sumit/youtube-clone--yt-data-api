import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDa2R-fJe6Y2iqEkq4_J9C5ZO0nSaPYXNM",
    authDomain: "not-utube.firebaseapp.com",
    projectId: "not-utube",
    storageBucket: "not-utube.appspot.com",
    messagingSenderId: "58016802203",
    appId: "1:58016802203:web:938aff5ae982a7a4c96d3e"
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl");

export const signInWithGoogle = async () => await auth.signInWithPopup(provider);

export const auth = firebase.auth();
