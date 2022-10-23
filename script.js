// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
//   import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
// import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import { doc, getDoc, getFirestore, collection, getDocs, query, where, onSnapshot, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPPYBWXkkrTuclceMyco9wRnbfIEvvZiM",
  authDomain: "saylani-c9b1a.firebaseapp.com",
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




let loginBtn = document.getElementById("loginBtn");






const login = () => {
  let loginEmail = document.getElementById("loginEmail");
  let loginPass = document.getElementById("loginPass");
  console.log(loginPass.value);
  signInWithEmailAndPassword(auth, loginEmail.value, loginPass.value)
    .then(async (userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("user", user);
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        getUserFromDataBase(user.uid);
        window.location.href = "admin.html"


      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("ErrorMsg =>", errorMessage);
    });

}


loginBtn.addEventListener('click', login)


// const getUserFromDataBase = async (uid) => {
//   const docRef = doc(db, "users", uid);
//   const docSnap = await getDoc(docRef);
//   let loginUserName = document.getElementById("loginUserName");
//   if (docSnap.exists()) {
//     // window.location.href = "admin.html";

//     loginUserName.innerHTML = `${docSnap.data().fullName} (${docSnap.data().email})`;
//     // getAllUsers(docSnap.data().email, uid, docSnap.data().name);
//   } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
//   }
// };



let loginUserName = document.getElementById("loginUserName");
let loginUserNameMain = document.getElementById("loginUserNameMain");
let loginUserNumber = document.getElementById("loginUserNumber");
let loginUserCountry = document.getElementById("loginUserCountry");
let loginUserPassword = document.getElementById("loginUserPassword");



window.onload = async () => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (!user.emailVerified) {
      }

      console.log(user)
      getUserFromDataBase(user.uid);
    } else {
      console.log("not login");
    }
  });
};



const getUserFromDataBase = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  // let userli = document.getElementById("userli");
  if (docSnap.exists()) {
    loginUserName.innerHTML = `
     ${docSnap.data().fullName}
    `;
    loginUserNameMain.innerHTML = `
     ${docSnap.data().fullName}
    `;
    loginUserEmail.innerHTML = `
     ${docSnap.data().email}
    `;
    loginUserNumber.innerHTML = `
     ${docSnap.data().phoneNo}
    `;
    loginUserCountry.innerHTML = `
     ${docSnap.data().country}
    `;
    loginUserPassword.innerHTML = `
     ${docSnap.data().password}
    `;
    getAllUsers(docSnap.data().email, uid, docSnap.data().fullName);
    console.log(docSnap.data().phoneNo);
  }
  else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};



const getAllUsers = async (email, currentId, currentName) => {
  const q = query(collection(db, "users"), where("email", "!=", email));

  let users = document.getElementById("users")
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    users.innerHTML += `<table>
    <tr>
    <td class="table_width">

    <a>${doc.data().fullName} </a> 
    </td>

    <td class="table_width">

    <button class="btn btn-sm btn-primary" onclick='startChat("${doc.id
      }","${doc.data().fullName
      }","${currentId}","${currentName}")' id="chat-btn">Start Chat</button>

    </td> 
    <br>

    </tr>

    </table>`;
    console.log(doc.id, " => ", doc.data());
  });
}
let send = document.getElementById("send");
let recieverName = document.getElementById("recieverName")
console.log(send);


let startChat = (id, fullName, currentId, currentName) => {
  let chatWith = document.getElementById("chat-with");
  chatWith.innerHTML = fullName;
  let message = document.getElementById("message");
  let chatID;
  if (id < currentId) {
    chatID = `${id}${currentId}`;
  } else {
    chatID = `${currentId}${id}`;
  }
  loadAllChats(chatID);
  
    send.addEventListener("click", async () => {
      let allMessages = document.getElementById("allMessages");
      allMessages.innerHTML = "";
      await addDoc(collection(db, "messages"), {
        sender_name: currentName,
        receiver_name: name,
        sender_id: currentId,
        receiver_id: id,
        chat_id: chatID,
        message: message.value,
        timestamp: new Date(),
      });
    });   
}


const loadAllChats = (chatID) => {
  const q = query(collection(db, "messages"), where("chat_id", "==", chatID));
  let allMessages = document.getElementById("allMessages");
  let recieverMessage = document.getElementById("recieverMessage");
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    allMessages.innerHTML = "";
    querySnapshot.forEach((doc) => {
      allMessages.innerHTML += `<div class="p-5 rounded bg-light-primary text-dark fw-bold mw-lg-400px text-end"
      data-kt-element="message-text" >${doc.data().message} </div> <br>`;
    });
  });
};



window.startChat = startChat;




