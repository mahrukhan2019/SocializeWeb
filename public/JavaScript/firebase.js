var firebaseConfig = {
    apiKey: "AIzaSyD-00I5Fe6bPmBrF3hO180wVHGX0XTai6M",
    authDomain: "socializeonweb.firebaseapp.com",
    databaseURL: "https://socializeonweb.firebaseio.com",
    projectId: "socializeonweb",
    storageBucket: "",
    messagingSenderId: "783272151971",
    appId: "1:783272151971:web:4c8e4be9bf0e4e0c956816"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const messageForm = document.getElementById("messageform");
  const msgBtn = document.getElementById("msg-button");
  const auth = firebase.auth();
  var database = firebase.database();
  



