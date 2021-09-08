import firebase from "firebase";
import { 
  FIREBASE_APIKEY,
  FIREBASE_AUTHDOMAIN,
  FIREBASE_PID,
  FIREBASE_SB,
  FIREBASE_SID,
  FIREBASE_APPID
} from '@env'

// Initialize Firebase
const firebaseConfig = Object.freeze({
  apiKey: FIREBASE_APIKEY as string || '',
  authDomain: FIREBASE_AUTHDOMAIN as string || '',
  projectId: FIREBASE_PID as string || '',
  storageBucket: FIREBASE_SB as string || '',
  messagingSenderId: FIREBASE_SID as string || '',
  appId: FIREBASE_APPID as string || '',
});

const Firebase = firebase.initializeApp(firebaseConfig)

export {Firebase}