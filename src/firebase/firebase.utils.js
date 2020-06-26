import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCFAprK56hP4To9eyc7d5FWz6_J7K0rD8",
  authDomain: "proyect-react-13fc8.firebaseapp.com",
  databaseURL: "https://proyect-react-13fc8.firebaseio.com",
  projectId: "proyect-react-13fc8",
  storageBucket: "proyect-react-13fc8.appspot.com",
  messagingSenderId: "649625448790",
  appId: "1:649625448790:web:8a5875e1d7408ec27826f7",
  measurementId: "G-28VP8DQXY1",
};
firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exits) {
    const { displayName, email } = userAuth;
    const createAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        ...additionalData,
        createAt,
      });
    } catch (error) {
      console.log("e -", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
