// Import the functions you need from the SDKs you need
//import {firebase} from "@react-native-firebase/firestore";

import {initializeApp} from "firebase/app";
import { signOut, createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, setDoc, collection, addDoc, getDocs, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { dataObject, users, User, images } from "./Data"

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
const firestore = getFirestore(app);
const storage = getStorage(app, "gs://academia-c3d0e.appspot.com/");
let data;

// const providerGoogle = new GoogleAuthProvider();
// providerGoogle.addScope('https://www.googleapis.com/auth/contacts.readonly');
// auth.languageCode = 'it';


//Cloud Storage
export function saveFiles(ref, file) {
    const storageRef = ref(storage, ref);
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });
}



//Firestore Database
export async function saveData(data, path, id) {
    try {
        const docRef = await setDoc(doc(firestore, path, id), data);
        console.log("Document written with ID: ", docRef, "\n", id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function getData(path) {
    data = [];
    const querySnapshot = await getDocs(collection(firestore, path));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        data.push(doc.data());
    });
    return doc.data();
}

export function readData(ref, callback) {
    const docRef = ref(firestore, ref);
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
            let userId = user.uid;
            users.push({
                name: username,
                description: "",
                profilePicture: images.defaultProfile,
                loginDetails: {
                    email: email,
                    password: password,
                },
                followers: "0",
                following: [],
                location: "----",
                sellerInfo: {
                    rating: 0,
                    productList: [],
                    amountSelling: "0",
                },
                id: userId,
            },);
            users.forEach(element => {
                saveData(element, "Users", element.name);
            });
            // ...

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export const logOut = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}
