// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore,  orderBy, query} from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCcYU0aSgjl085Z7yq5e-Q0S4nAK7fnrI",
  authDomain: "tasks-56fd5.firebaseapp.com",
  projectId: "tasks-56fd5",
  storageBucket: "tasks-56fd5.appspot.com",
  messagingSenderId: "821746240138",
  appId: "1:821746240138:web:af77365a442c3ec235fb73"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Service
export const db = getFirestore()
export const auth = getAuth()
export const provider = new GoogleAuthProvider()

// Create Collection Ref
export const colRef = collection(db, 'tasks')
export const listRef = collection(db, 'lists')

// // Get Collection Data 
// getDocs(colRef).then((snapshot) => {
//     let tasks = []
//     snapshot.docs.forEach((doc) => {
//         tasks.push({ ...doc.data(), id: doc.id })
//     })
//     // console.log(tasks.map(task => task.task))
// }).catch(err => {
//     console.log(err.message)
// })


// Replaces Get Collection Data - updates on changes ***********
// onSnapshot(colRef, (snapshot) => {
//     let tasks = []
//     snapshot.docs.forEach((doc) => {
//         tasks.push({ ...doc.data(), id: doc.id })
//     })
//     console.log(tasks)
// })



// queries - listen to certain data

export const q = query(colRef, orderBy("time"))
export const q2 = query(listRef, orderBy("item"))


// gets single documents
// onSnapshot(q, (snapshot) => {
//     let tasks = []
//     snapshot.docs.forEach((doc) => {
//         tasks.push({ ...doc.data(), id: doc.id })
//     })
//     console.log(tasks)
// })


// Get a single Doc 
// const docRef = doc(db, 'tasks', 'QiY4FnLvBur70BkYxGjj')

// listen for an update on a Doc

// onSnapshot(docRef, (doc) => {
//     console.log(doc.data(), doc.id)
// })