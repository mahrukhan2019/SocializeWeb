var databaseref = database.ref().child("UsersMessages");


var msgRef;


let usern;
var friendid = localStorage.getItem("id");
var to;
let friendkey;
var fromid;
var toid;
let userid;
var nameofcurrent;
let k;
let username;
let fromuser;
let touser;

firebase.auth().onAuthStateChanged(function (user) {

  if (user) {
    username = user.displayName;
    userid = user.uid;
    name = username;
    usern = username;
    nameofcurrent = username;
    document.getElementById("fromclass").innerHTML = username;
    document.getElementById("toclass").innerHTML = friendid;

    fromuser = username;
    to =  friendid.trim();


    database.ref().child('Users').on("child_added", function (snapshot2) {
   
      //console.log(snapshot2.val());
    
        var { name } = snapshot2.val();
    
        if (name == to) {
          //console.log(name);
          friendkey = snapshot2.key;
        console.log(friendkey);
          //arrayofkey.push(friendkey);
    
          loadmessage();
          
    
        }
    
      })





  
    localStorage.removeItem("toname");
  
    //

   
    //
  }

  
})


function submition() {
  msgRef = database.ref().child("messages");
  event.preventDefault();

  var d = new Date();
  var n = d.getTime() / 1000;
  const name = username;
  let time = n;
  var from = document.getElementById("fromclass");

  let uid = firebase.auth().currentUser.uid;
  let msgInput = document.getElementById("msg-input");
  const text = msgInput.value;
  console.log(text);
  /*   */


  database.ref().child('Users').orderByChild('name').on("value", function (snapshot) {
    snapshot.forEach(function (data) {
      var { name } = data.val();

      if (name == to) {
        // console.log(name);
       // friendkey = data.key;
        // console.log(friendkey);

      }
    });
  });

  from = username;
  fromid = uid;
  toid = friendkey;
console.log(friendkey);
console.log(fromid);
  let childref = msgRef.push();
  if (!text.trim()) return;

  const msg = {
    to,
    from,
    fromid,
    toid,
    text,
    time
  };
 

  let childrefer = msgRef.push(msg)
  let keyofmessage = childrefer.key;
  msgInput.value = "";


  //childref.set(msg);

  database.ref().child('UsersMessages').child(uid).child(friendkey).child(keyofmessage).set({
    message: 1
  });

  database.ref().child('UsersMessages').child(friendkey).child(uid).child(keyofmessage).set({
    message: 1
  });



}







function logoutButton() {

  auth.signOut()
    .then(function () {
      console.log("sucessful");
      window.location.href = 'index.html';

      // Sign-out successful.
    })
    .catch(function (error) {
      console.log(error);
      // An error happened
    });

}



//







  function loadmessage() {
    msgRef = database.ref().child("messages");

    var user = firebase.auth().currentUser;

    
    let messageScreen = document.getElementById("messages");

    
    
    
        
        database.ref().child("UsersMessages").child(userid).child(friendkey).on('child_added', function (snapo) {
 
         // console.log(snapo.key);
          let keys = snapo.key;
             msgRef.child(keys).on('value', function (snapo1) {
              //console.log(snapo1.key);
              //console.log(snapo1.val());
    
              const { fromid, toid, to, from, text, time } = snapo1.val();
              //console.log(from);
             // console.log(to);
              //console.log(document.getElementById('fromclass'));
              nameofcurrent = from;
              //console.log(document.getElementById('fromclass').value);
              //console.log(document.getElementById('toclass').value);
              //console.log(username);
              //console.log(friendid);
  
              if ((from == username && to == friendid.trim()) || (to == username && from == friendid.trim())) {
  
  
  
  
                if (fromid == userid) {
                  let msg1 = `<li class= "my">
                      <span>
                        <i class="name">${nameofcurrent}: </i> ${text}
                      </span>
                    </li>`;
  
  
                  messages = document.getElementById("chatwindow");
  
                  shouldScroll = messages.scrollTop + messages.clientHeight === messages.scrollHeight;
  
                  messageScreen.innerHTML += msg1;
                  if (!shouldScroll) {
                    scrollToBottom();
                  }
  
                }
  
  
  
  
                else {
                  let msg1 = `<li class= "msg">
                      <span>
                        <i class="name">${nameofcurrent}: </i> ${text}
                      </span>
                    </li>`;
                  messages = document.getElementById("chatwindow");
  
                  shouldScroll = messages.scrollTop + messages.clientHeight === messages.scrollHeight;
  
                  messageScreen.innerHTML += msg1;
                  if (!shouldScroll) {
                    scrollToBottom();
                  }
  
  
  
                }
  
                let message10 = document.getElementById("chatwindow");
                function scrollToBottom() {
                  message10.scrollTop = message10.scrollHeight;
                }
  
                scrollToBottom();
  
              }
  
  
  
  
            })
    
    
              
             })
       
  
  
   
            }


//searching friends
function searchFriends() {
  msgRef = database.ref().child("messages");

  let text = document.getElementById("example-text").value;
  console.log(text);


  let friendsref = firebase.database().ref().child("Users").orderByChild("name");

  friendsref.on("child_added", function (snapshot) {

    let { name } = snapshot.val();
    let { uid } = snapshot.val();
    let { email } = snapshot.val();
    console.log(uid);
    console.log(name);


    if (name == text) {
      frienddata.child("friends").child(uid).set({
        name: text,
        email: email
      });
    }

  })

}
            