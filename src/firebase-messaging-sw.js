import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js';
import { getMessaging, onBackgroundMessage } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-messaging-sw.js';

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

self.addEventListener( "install", event => {
  self.skipWaiting();
  console.log('service worker ready')
});

onBackgroundMessage(messaging, (payload) => {
  const notification = payload.data;
  self.registration.showNotification(notification.title, { body: notification.body, icon: notification.icon });
});