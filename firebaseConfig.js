import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";

  const firebaseConfig = {
    apiKey: "AIzaSyADJQq2fz6b6VXZnAz4vjnC9td11o5m4xY",
    authDomain: "gbuild-d2700.firebaseapp.com",
    projectId: "gbuild-d2700",
    storageBucket: "gbuild-d2700.appspot.com",
    messagingSenderId: "536218718918",
    appId: "1:536218718918:web:fa22f6fda6678644333dc7",
    measurementId: "G-GWV0KG2TW6"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);