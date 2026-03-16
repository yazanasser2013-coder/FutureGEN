// Your web app's Firebase configuration
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

// Initialize Firebase using compat libraries which are available globally
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    window.firebaseDB = firebase.database();
} else {
    console.error("Firebase compat libraries not loaded.");
}