var databaseref = database.ref().child("UserMessages");


var msgRef = database.ref().child("messages");
let usern;
var friendid;
let to;
let from;
let friendkey;
var fromid;
var toid;
let userid;
var nameofcurrent;
let k;
let username;
let m;

var messagesUser = [];
let messagesDictionary = [];
let message1;

let msgScreen;




database.ref().child("Users").on('value', function (snap) {
  // console.log(snap.val());
  var { name, email } = snap.val();
  // console.log("name is " + name);
  // console.log(to);
  if (name == to) {
    k = snap.key;
    //  console.log(k);
  }
}
)

firebase.auth().onAuthStateChanged(function (user) {
  if (user != null) {

    username = user.displayName;
    userid = user.uid;
    name = username;
    usern = username;
    nameofcurrent = username;

    getallmessages()


    //
  }

})










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







////////////////////////






class Message {
  constructor(time, to, from, toid, fromid, text) {
    this.from = from;
    this.time = time;

    this.to = to;
    this.toid = toid;
    this.fromid = fromid;
    this.text = text;

  }

  chatPartnerID(fromid, toid) {
    if (this.fromid == firebase.auth().currentUser.uid) {
      //console.log(firebase.auth().currentUser.uid)
      return toid;
    }
    else {
      return fromid;
    }

  };

}


function getallmessages() {


  let usermessageref = database.ref().child('UsersMessages').child(userid);




  usermessageref.on("value", function (snapshot) {
    snapshot.forEach(function (data) {
      let snapshotkey1 = data.key;
      //console.log(snapshotkey1);

      let usermessageref1 = database.ref().child('Users').child(userid).child('friends').child(snapshotkey1)

      usermessageref1.on("value", function (snapp) {
       // console.log(snapp.val());
        if(snapp.val() == null){
          return;
        }
        const {name} = snapp.val();
       // console.log(name);
        let msgarea = document.getElementById('messagesul');
      
        let msg1 = `<tr>
  <td class = "nr"> ${name}:</td> 
  <td><button onclick = "checkmessbutton(this)" id = "checkmessbutton">Check Messages</button></td>
  <td><button onclick = "deleteMessage(this)" id = "deletemessbutton"><img src=  "/public/images/Screen.png" 
  width= 30px height= 30px ></button></td>
  
  
  </tr>`

          ;

        msgarea.innerHTML += msg1;
      })



    })

  })



}

//console.log(messages);




$('table').on('click', '.btn', function () {//replace table selector with an id selector, if you are targetting a specific table
  var row = $(this).closest('tr'),
    cells = row.find('td'),
    btnCell = $(this).parent();
  //set to work, you have the cells, the entire row, and the cell containing the button.
});




function checkmessbutton(elm) {

  var id = $(elm).closest("tr").find(".nr").text();

  if (id.charAt(id.length - 1) == ":") {
    id = id.substring(0, id.length - 1);
  }
  console.log(id);
  localStorage.setItem("id", id); //setter

  window.location.href = 'generalmessage.html';


}


let snapshotkey1;
function deleteMessage(elm) {

  var id1 = $(elm).closest("tr").find(".nr").text();

  if (id1.charAt(id1.length - 1) == ":") {
    id1 = id1.substring(0, id1.length - 1);
  }
  console.log(id1);
  //localStorage.setItem("id", id); //setter

  // window.location.href ='generalmessage.html';
  let usermessageref = database.ref().child('Users').child(userid).child("friends");




  usermessageref.on("value", function (snapshot) {
    snapshot.forEach(function (data) {
      const {name} = data.val()
      //console.log(name);
     snapshotkey1 = data.key;
      if (name == id1.trim()) {
      
      console.log(snapshotkey1);
      
    
    let refer = database.ref().child('UsersMessages').child(userid).child(snapshotkey1)



    refer.on('child_added', function (snapshot1) {
        //do stuff

        console.log(snapshot1.key);
    let refer11 = database.ref().child('UsersMessages').child(userid).child(snapshotkey1);
    refer11.remove();
    window.location.reload();
      });

    }
      
   


     

    })
  })



}


