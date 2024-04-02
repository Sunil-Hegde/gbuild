import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.1/firebase-app.js";
import { 
    getDatabase, 
    ref, 
    update,
    get
} from "https://www.gstatic.com/firebasejs/10.5.1/firebase-database.js";
import { 
    getAuth,  
    GoogleAuthProvider,
    signInWithPopup, 
    onAuthStateChanged, 
    signOut 
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
    const logoutButton = document.getElementById('logout');
    const trialElement = document.getElementById('username');

    onAuthStateChanged(auth, (user) => {
        if (user) {
            signInWithGoogleButton.style.display = 'none';
            logoutButton.style.display = 'block';
            const userId = user.uid;
            const userRef = ref(database, 'users/' + userId);
            get(userRef)
            .then((userData) => {
                if (userData.exists()) {
                    const username = userData.val().username;
                    const userEmail = userData.val().email;
                    trialElement.innerHTML = `<h2>Hello ${username}</h2>`;
                }
            })
            .catch((error) => {
                console.error("Error checking user data:", error);
            });
        } else {
            signInWithGoogleButton.style.display = 'flex';
            logoutButton.style.display = 'none';
            trialElement.innerHTML = '<h2>Please login</h2>';
        }
    });

    signInWithGoogleButton.addEventListener('click', (e) => {
        e.preventDefault();
        signInWithPopup(auth, provider)
        .catch((error) => {
            console.error('Error during sign-in:', error.code, error.message);
        });
    });

    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        signOut(auth)
        .catch((error) => {
            console.error("Error during sign-out:", error);
            alert('Error during sign-out.');
        });
        console.log("User logged out.");
    });
});