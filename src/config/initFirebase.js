import React, { useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getAnalytics } from "firebase/analytics";

export default function FirebaseMessaging() {
  // const firebaseConfig = {
  //   apiKey: "AIzaSyBpyAxl287uln_3qTjYwG01NDSx-ZredOg",
  //   authDomain: "fcm-test-85991.firebaseapp.com",
  //   projectId: "fcm-test-85991",
  //   storageBucket: "fcm-test-85991.appspot.com",
  //   messagingSenderId: "915246906633",
  //   appId: "1:915246906633:web:0cb5f355e6c539ab0a67d8",
  //   measurementId: "G-77BS8EW9W0"
  // };
  const firebaseConfig = {
    apiKey: "AIzaSyCFfVYEw-CpGlvXo87bKct9RZNLiuiHJFw",
    authDomain: "diarium-web-49a52.firebaseapp.com",
    projectId: "diarium-web-49a52",
    storageBucket: "diarium-web-49a52.appspot.com",
    messagingSenderId: "854321595633",
    appId: "1:854321595633:web:0d56626cffc8a7e36c1550",
    measurementId: "G-794H035CXL"
  };

  // Initialize Firebase
  useEffect(() => {
    initializeApp(firebaseConfig);
    const messaging = getMessaging();
    // const analytics = getAnalytics(app);

    // vapid key is get from firebase settings

    getToken(messaging, { vapidKey: 'BA3G7HhhXzmm9Iqm_jvrShYR7UyXupbPax9fTmhq3PYh_D9LpM4mzoPA7frAMF2sySsY_bwqwSNJEkRiQ96vvrc' }).then((currentToken) => {
      if (currentToken) {
         // console.log("firebase token : ", currentToken)
        // Send the token to your server and update the UI if necessary
        // ...
      } else {
        // Show permission request UI
         // console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
       // console.log('An error occurred while retrieving token. ', err);
      // ...
    });
    onMessage(messaging, (payload) => {
       // console.log('Message received. ', payload);
      // ...
    });
  })
  return (
    <></>
  )
}

