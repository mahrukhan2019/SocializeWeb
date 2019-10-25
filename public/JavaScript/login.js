
function registerButton() {
    let name_user = document.getElementById("nameid_register").value;
    
    let username = name_user[0].toUpperCase() + name_user.substring(1);
    let email_user = document.getElementById("emailid_register").value;
    let password_user = document.getElementById("passwordid_register").value;
      
      if ((name_user != "" || email_user != "" || password_user != "") && (password_user.includes('!')||password_user.includes('@')|| password_user.includes('#'))) {
        let formMessage = firebase.database().ref('Users');
        auth.createUserWithEmailAndPassword(email_user, password_user)
          .then(function sendMessage(name, email) {
            let uid = firebase.auth().currentUser.uid;
            var user = firebase.auth().currentUser;
          
    
    
            user.updateProfile({
              displayName: username,
    
            }).then(function () {
              // Update successful.
            }).catch(function (error) {
              // An error happened.
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(error);
            });
    
            let newFormMessage = formMessage.child(uid);
            newFormMessage.set({
              name: username,
              email: email_user,
              uid: uid
    
            }).then(function () {
              window.location.href = 'index.html';
            })
    
    
          })
          .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode == 'auth/weak-password') {
              alert('The password is too weak.');
            } else {
              alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
          });
      }
      else {
        alert('Passwords must contain !, @, or #');
      }
    
    }
    
    function loginButton() {
      email_user = document.getElementById("emailid_login").value;
      password_user = document.getElementById("passwordid_login").value;
      auth.signInWithEmailAndPassword(email_user, password_user)
        .then(function () {
          window.location.href = 'index.html';
    
        })
    
    
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
    
          // [END_EXCLUDE]
        });
    
    
    
    }

