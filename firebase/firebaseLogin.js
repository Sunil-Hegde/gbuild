import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.1/firebase-app.js";
import { 
    getDatabase, 
    ref, 
    update 
} from "https://www.gstatic.com/firebasejs/10.5.1/firebase-database.js";
import { 
    getAuth,  
    GoogleAuthProvider,
    signInWithPopup 
} from "https://www.gstatic.com/firebasejs/10.5.1/firebase-auth.js";
const firebaseConfig = {
    apiKey: "AIzaSyADJQq2fz6b6VXZnAz4vjnC9td11o5m4xY",
    authDomain: "gbuild-d2700.firebaseapp.com",
    databaseURL: "https://gbuild-d2700-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "gbuild-d2700",
    storageBucket: "gbuild-d2700.appspot.com",
    messagingSenderId: "536218718918",
    appId: "1:536218718918:web:fa22f6fda6678644333dc7",
    measurementId: "G-GWV0KG2TW6"
  };
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
document.addEventListener('DOMContentLoaded', function () {
    const signInWithGoogleButton = document.querySelector('.signInButton.signInWithGoogleButton');
    signInWithGoogleButton.addEventListener('click', (e) => {
        console.log("Hello");
        e.preventDefault();
        signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Hello");
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const info = result.user;
            var email = info.email;
            var username = info.displayName;
            const userId = result.user.uid;
            const userRef = ref(database, 'users/' + userId);
            const dt = new Date();
            update(userRef, {
                username: username,
                email: email,
                last_login: dt,
            })
            .then(() => {
                window.location.href = 'index.html';
                console.log("logged in");
            })
            .catch((error) => {
                console.error('Error during sign-in:', error.code, error.message);
            });
        })
        .catch((error) => {
            console.error('Error during sign-in:', error.code, error.message);
        });
    });
});