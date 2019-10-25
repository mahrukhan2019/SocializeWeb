let username;
let uid;
let postref;
let friendrefer;

firebase.auth().onAuthStateChanged(function(user) { 
  if (user) {
   //console.log(user);
   username = user.displayName
   uid = user.uid;
   document.getElementById("user_id").innerHTML = username;
   //readposts();

postref = firebase.database().ref().child("Posts").child(uid);
iffriendthenpost();
//postref.on("child_added", readposts);

  }
  else {
    logoutButton();
     }
   
    })


    function logoutButton() {

      auth.signOut()
      .then(function() {
       window.location.href='login.html';
      
        // Sign-out successful.
      })
      .catch(function(error) {
          console.log(error);
        // An error happened
      });
      
      }



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
    }
  })




}

function addpost(){

  postref = firebase.database().ref().child("Posts").child(uid);
  console.log("add post clicked");
  event.preventDefault();

  var d = new Date();
  var n = d.getTime() / 1000;
  const name = username;
  let time = n;
let post = document.getElementById("inputbox").value;
console.log(post);


var postmsg = {
  name, 
  time, 
  post

}

//console.log(postmsg);
postref.push(postmsg);
document.getElementById("inputbox").value = "";
}

function iffriendthenpost(){
  const postScreen = document.getElementById("postul");

  friendsrefer = firebase.database().ref().child("Users").child(uid).child('friends');




  postref1 = firebase.database().ref().child("Posts").child(uid);




  postref1.on('child_added', function (snap){

   //console.log(snapshot2.val());
   const{name, time, post} = snap.val();
   var key2 = snap.key;
   //console.log(uid1);
   console.log(key2);

console.log(snap.val());




console.log(name);
console.log(time);
console.log(post);

let posttime = timeConverter(time);

//document.getElementById("posts").innerHTML = (name + "</br> " + posttime + "</br> " + post);

let post1 = `<tr>
<td class = "nr"> ${"Name: "+ name + "</br> " + "Time: "+posttime + "</br> " +post}</td> 
</tr>`

postScreen.innerHTML += post1;
////


   })


  friendsrefer.on("child_added", function (snapshot) {

    var name = snapshot.val();
    let  uid1  = snapshot.key;
    
    //console.log(name);
      console.log(uid1);
   ////////////////



    
postref = firebase.database().ref().child("Posts").child(uid1);
postref.on('child_added', function (snap){

      //console.log(snapshot2.val());
      const{name, time, post} = snap.val();
      var key2 = snap.key;
      console.log(uid1);
      console.log(key2);
   
console.log(snap.val());




console.log(name);
console.log(time);
console.log(post);

let posttime = timeConverter(time);
  
  //document.getElementById("posts").innerHTML = (name + "</br> " + posttime + "</br> " + post);

 let post1 = `<tr>
 <td class = "nr"> ${"Name: "+ name + "</br> " + "Time: "+posttime + "</br> " +post}</td> 
</tr>`

postScreen.innerHTML += post1;
////

  
      })
  
  
  
      


})


  
 

}





function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}