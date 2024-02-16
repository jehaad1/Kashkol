import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  addDoc,
  deleteDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from "firebase/auth";
import { createSignal } from "solid-js";

export const [isLoggedIn, setIsLoggedIn] = createSignal(false);
export const [profile, setProfile] = createSignal({});

let onLoggedInCallback, onLoggedOutCallback;

export function onLoggedIn(callback) {
  onLoggedInCallback = callback;
}

export function onLoggedOut(callback) {
  onLoggedOutCallback = callback;
}

const firebaseConfig = {
  apiKey: "AIzaSyBO7Qb0KG-wCxrckzD6zqVvC2ogS47E8Xs",
  authDomain: "kashkol-testing.firebaseapp.com",
  projectId: "kashkol-testing",
  storageBucket: "kashkol-testing.appspot.com",
  messagingSenderId: "175418565535",
  appId: "1:175418565535:web:228b90131aea74f05213aa",
};

let app, db, auth, googleAuthProvider;

if (!app) app = initializeApp(firebaseConfig);
if (!db) db = getFirestore();
if (!auth) {
  auth = getAuth();
  googleAuthProvider = new GoogleAuthProvider();
  setPersistence(auth, browserSessionPersistence);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setProfile({
        username: user.displayName,
        avatar: user.photoURL,
        uid: user.uid,
      });
      if (onLoggedInCallback) onLoggedInCallback(profile());
      setIsLoggedIn(true);
    } else {
      setProfile({});
      setIsLoggedIn(false);
      if (onLoggedOutCallback) onLoggedOutCallback();
    }
  });
}

export {
  db,
  collection,
  onSnapshot,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  addDoc,
  deleteDoc,
  doc,
  arrayUnion,
  auth,
  googleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
};
