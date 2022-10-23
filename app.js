
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
//   import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
  import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
  import { doc, setDoc, getDoc, getFirestore, } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"; 


  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAPPYBWXkkrTuclceMyco9wRnbfIEvvZiM",
    authDomain: "saylani-c9b1a.firebaseapp.com",
    databaseURL: "https://saylani-c9b1a-default-rtdb.firebaseio.com",
    projectId: "saylani-c9b1a",
    storageBucket: "saylani-c9b1a.appspot.com",
    messagingSenderId: "38115899500",
    appId: "1:38115899500:web:105c89762ed805e1648049",
    measurementId: "G-HNJ70MGHG5"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);

const auth = getAuth();
// const db = getDatabase();
const db = getFirestore(app)


const database = getDatabase();

let registerBtn = document.getElementById("registerBtn")
console.log(registerBtn);




// if (registerBtn) {
  registerBtn.addEventListener("click",function(){
    let email = document.getElementById("email")
    let password = document.getElementById("pass")
    let fullName = document.getElementById("name")
    let phone = document.getElementById("phoneNo")
    let country = document.getElementById("country")
    console.log(email)
    createUserWithEmailAndPassword(auth, email.value, password.value, fullName.value, country.value, phone.value)
  .then(async(userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // set(ref(db , `users/${user.uid}`), {
    //   email : email.value,
    //   password : password.value
    // })

    await setDoc(doc(db, "users", user.uid), {
      email: email.value,
      password: password.value,
      fullName: fullName.value,
      phoneNo: phoneNo.value,
      country: country.value,
    });
    console.log("SucessMsg =>" , user, doc);
    window.location.href = "index.html"

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("ErrorMsg =>" , errorMessage , errorCode);
    // ..
  });
})













