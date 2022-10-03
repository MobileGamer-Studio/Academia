// Import the functions you need from the SDKs you need
//import {firebase} from "@react-native-firebase/firestore";


import {initializeApp} from "firebase/app";
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, setDoc, getDocs, doc, collection, ref } from 'firebase/firestore';
import { getStorage, uploadBytes } from "firebase/storage";
import { users, images, User } from "./Data"

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
let data;

const providerGoogle = new GoogleAuthProvider();
providerGoogle.addScope('https://www.googleapis.com/auth/contacts.readonly');
auth.languageCode = 'it';


//Cloud Storage
export function saveFiles(ref, file) {
    const storageRef = ref(storage, ref);
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a file!');
    });
}



//Firestore Database
export async function saveData(data, collection, id) {
    try {
        const docRef = await setDoc(doc(firestore, collection, id), data);
        console.log("Document written with ID: ", docRef, "\n", id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function setData(data, collection, id = ""){
    await setDoc(doc(firestore, collection, id), data);
}

export async function getData(path) {
    data = [];
    const querySnapshot = await getDocs(collection(firestore, path));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        data.push.apply(data, doc.data())
    });
    console.log("Data gotten: "+ data)
    return data;
}

export function readData(reference, callback) {
    const docRef = ref(firestore, reference);
    docRef.get().then((doc) => {
        if (doc.exists) {
            callback(doc.data());
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}



//Authentication
export const SignIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const userCred = userCredential.user;
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
            let userId = users.length + 1
            let newUser  = User

            newUser.name = username;
            newUser.loginDetails.email = user.email;
            newUser.loginDetails.password = password;
            newUser.id = userId.toString();


            users.push(newUser);
            saveData(newUser, "Users", newUser.name).then(r => console.log("new user created: "+ r));
            // users.forEach(element => {
            //     saveData(element, "Users", element.name).then(r => console.log(r));
            // });
            // ...

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

const SignIn_Google = () => {
    signInWithPopup(auth, providerGoogle)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user)
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
