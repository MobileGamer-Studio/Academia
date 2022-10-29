// Import the functions you need from the SDKs you need
//import {firebase} from "@react-native-firebase/firestore";


import {initializeApp} from "firebase/app";
import {signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult} from 'firebase/auth';
import { getFirestore, setDoc, getDocs, doc, collection, addDoc} from 'firebase/firestore';
import { getStorage, uploadBytes, ref} from "firebase/storage";
import { users, User } from "./Data"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyBWrzegp3MkMikhLXjdMv74Rga4cwmSPZo",
    authDomain: "academia-c3d0e.firebaseapp.com",
    databaseURL: "https://academia-c3d0e-default-rtdb.firebaseio.com",
    projectId: "academia-c3d0e",
    storageBucket: "academia-c3d0e.appspot.com",
    messagingSenderId: "585448979814",
    appId: "1:585448979814:web:6ee03139f41aa723041ca7",
    measurementId: "G-V4KTR5JSNP"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app, "gs://academia-c3d0e.appspot.com/");

const providerGoogle = new GoogleAuthProvider();
providerGoogle.setCustomParameters({
    'login_hint': 'user@example.com'
});
providerGoogle.addScope('https://www.googleapis.com/auth/contacts.readonly');
auth.languageCode = 'it';


//Cloud Storage
export function saveFiles(reference, file) {
    const storageRef = ref(storage, reference);
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a file!');
    });
}

//Firestore Database
export async function saveData(data, ref, id) {
    try {
        const docRef = await setDoc(doc(firestore, ref, id), data)
        console.log("Document written with ID : ", docRef, ", ", id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function addData(data, ref, id) {
    const docRef = await addDoc(doc(firestore, ref, id), data)
}

export async function getData(path) {
    let data = []
    const querySnapshot = await getDocs(collection(firestore, path));
    querySnapshot.forEach((doc) => {
        data.push(doc.data());
        console.log(doc.id, " => ", doc.data());
    });

    console.log("Data Gotten: "+ data)
    return data;
}

export async function getUserData(path, id) { 
    let data = [];
    const querySnapshot = await getDocs(doc(firestore, path, id));
    console.log("Data gotten: "+ data)
    return data;
}

//Authentication
export const SignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const userCred = userCredential.user;
            console.log("Sign in successful")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

        });
}

export const SignUp = (email, password, username) => { 
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            let newUser  = User

            newUser.name = username;
            newUser.loginDetails.email = user.email;
            newUser.loginDetails.password = password;
            newUser.id = user.uid;

            saveData(newUser, "Users", newUser.id).then(r => console.log("new user created: "+ r));
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage)
        });
}

export const SignIn_Google_Redirect = () => {
    signInWithRedirect(auth, providerGoogle);
    getRedirectResult(auth)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access Google APIs.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;

            console.log(user)

            let newUser  = User
            user.

            newUser.name = user.displayName;
            newUser.loginDetails.email = user.email;
            newUser.loginDetails.password = "google";
            newUser.id = user.uid;

            users.push(newUser);
            saveData(newUser, "Users", newUser.name).then(r => console.log("new user created: "+ r));
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}


export const SignIn_Google_PopUp = () => {
    signInWithPopup(auth, providerGoogle)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;
            console.log(user)

            let newUser  = User

            newUser.name = user.displayName;
            newUser.loginDetails.email = user.email;
            newUser.loginDetails.password = "";
            newUser.id = user.uid;

            users.push(newUser);
            saveData(newUser, "Users", newUser.name).then(r => console.log("new user created: "+ r));
            // ...
        }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
    });
}

export const logOut = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log(" Sign-out successful.");
    }).catch((error) => {
        // An error happened.
        console.log(error);
    });
}