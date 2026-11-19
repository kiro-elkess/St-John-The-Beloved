importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');
importScripts('firebase-config.js');

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification?.title || payload.data?.title || 'أسرة القديس يوحنا الحبيب ✝️';
  const notificationOptions = {
    body: payload.notification?.body || payload.data?.body || 'تذكير جديد من أسرة القديس يوحنا الحبيب',
    icon: 'images/logo.png',
    badge: 'images/logo.png',
    data: { url: payload.data?.url || './index.html' }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});