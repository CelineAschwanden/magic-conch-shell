import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js';
import { getMessaging, onBackgroundMessage, isSupported } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-messaging-sw.js';

const app = initializeApp({
    apiKey: "AIzaSyALiLmZfKcRqliXrv7ltWhT4_O8XYJV5M8",
    authDomain: "magic-conch-shell-5a8c6.firebaseapp.com",
    databaseURL: "https://magic-conch-shell-5a8c6-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "magic-conch-shell-5a8c6",
    storageBucket: "magic-conch-shell-5a8c6.appspot.com",
    messagingSenderId: "643537807119",
    appId: "1:643537807119:web:9d423c4c298dd9a740c07a",
    measurementId: "G-4SMRX41637",
});


const messaging = getMessaging(app);

onBackgroundMessage(messaging, ({ notification: { title, body, image } }) => {
  self.registration.showNotification(title, { body, icon: image || '/assets/conch-shell-logo.png' });
});