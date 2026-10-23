import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// Firebase client config is intentionally public — security is enforced by database rules
const firebaseConfig = {
  apiKey:            "AIzaSyCW9BrcxNnICN1F_rhlCrbAcn8POihTSs4",
  authDomain:        "brussels-tribunal.firebaseapp.com",
  databaseURL:       "https://brussels-tribunal-default-rtdb.europe-west1.firebasedatabase.app",
  projectId:         "brussels-tribunal",
  storageBucket:     "brussels-tribunal.firebasestorage.app",
  messagingSenderId: "152593739874",
  appId:             "1:152593739874:web:277c3b82cfaf7812e6e13b",
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
