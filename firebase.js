// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBmTdYQcLAJxhrWpqRaFFWqy4uSlRVVLIE",
    authDomain: "futuregen-ba172.firebaseapp.com",
    databaseURL: "https://futuregen-ba172-default-rtdb.firebaseio.com",
    projectId: "futuregen-ba172",
    storageBucket: "futuregen-ba172.firebasestorage.app",
    messagingSenderId: "607353543902",
    appId: "1:607353543902:web:40267390fa4bf2053db64f",
    measurementId: "G-Y49MRHCFRT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);