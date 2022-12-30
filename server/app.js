const { initializeApp, applicationDefault, cert} = require('firebase-admin/app');
const { getFirestore, collection, getDocs, doc, setDoc, getDoc, updateDoc, deleteDoc } = require('firebase-admin/firestore');

initializeApp({
    credential: applicationDefault(),
});

const db = getFirestore();

const ManageData = async () => {
    const snapshot = await db.collection('Users').get();
    snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
    });
}

ManageData();