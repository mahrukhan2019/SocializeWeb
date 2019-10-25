let databaseoffriends = firebase.database().ref().child("Users");
let friendset = new Set();
var user = firebase.auth().currentUser;
let frienddata;
let uid;


firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
   // console.log(user.uid);
    uid = firebase.auth().currentUser.uid;
    frienddata = databaseoffriends.child(user.uid);

    frienddata.child("friends").on("child_added", updatefriends);

    // User is signed in.
  } else {
    logoutButton()
    // No user is signed in.
  }
})





//searching friends
function searchFriends() {
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
      document.getElementById("example-text").value = "";

    }
    else{
      document.getElementById("example-text").value = "";

    }

  })

}


//for updating friends
const updatefriends = data => {
  const { name, email, } = data.val();
 // console.log(data.val());
  const friendScreen = document.getElementById("Friendsul");
  let frd1 = `<tr>
          <td class = "nr"> ${name}:</td> 
         
          <td><button onclick = "SendMessage(this)" id = "sendmessbutton">Send a Message</button></td>
          <td><button onclick = "deleteMessage(this)" id = "deletemessbutton">  <img src=  "/public/images/Screen.png" 
          width= 30px height= 30px >

          </button></td>

        </tr>`

    ;

  friendScreen.innerHTML += frd1;
}


function SendMessage(elm) {
 
var id = $(elm).closest("tr").find(".nr").text();

if (id.charAt(id.length - 1) == ":")
    {
      id = id.substring(0, id.length - 1);
    }
    console.log(id);
    localStorage.setItem("id", id); //setter

    window.location.href ='generalmessage.html';

    
}


// log out

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
let snapshotkey1;
let keyoffriend;
let wow;
function deleteMessage(elm) {

  var id1 = $(elm).closest("tr").find(".nr").text();

  if (id1.charAt(id1.length - 1) == ":") {
    id1 = id1.substring(0, id1.length - 1);
  }
  console.log(id1);

  let usermessageref = database.ref().child('Users').child(uid).child("friends");

//////*/////


usermessageref.on("value", function (snapshot) {
  snapshot.forEach(function (data) {
    const {name} = data.val()
    //console.log(name);
  
    if (name == id1.trim()) {
      snapshotkey1 = data.key;
    console.log(snapshotkey1);
    }
  })

   let refer = database.ref().child('UsersMessages').child(uid).child(snapshotkey1);

  refer.on('child_added', function (snapshot1) {
  
  console.log(snapshot1.key);
   wow = snapshot1.key;


   console.log(uid + "uid");
   console.log(snapshotkey1 + "snapkey1");
console.log(wow);

  let refer11 = database.ref().child('UsersMessages').child(uid).child(snapshotkey1).child(wow);
   
   if(wow != null){
    refer11.remove();
    window.location.reload();
    }

    });
  
})
  /////////////*///////
  usermessageref.on("child_added", function (snapshot) {
     console.log(snapshot.val());
    
      const {name} = snapshot.val();
        if(name == id1.trim()){
          console.log("true");
        keyoffriend = snapshot.key;
        
        console.log(keyoffriend);
    
    
        }
      })
      
      let usermessageref1 = database.ref().child('Users').child(uid).child("friends").child(keyoffriend);
      usermessageref1.remove();

    
    /////////
    

//////


}