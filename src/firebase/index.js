import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: 'AIzaSyBYTCy29zt2utAuKwY_N2r6rmoy2oKiFv4',
  authDomain: 'notify-e6610.firebaseapp.com',
  projectId: 'notify-e6610',
  storageBucket: 'notify-e6610.appspot.com',
  messagingSenderId: '257998149427',
  appId: '1:257998149427:web:312423d7bac4bb1a53d046'
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)

export {
  db, 
  auth
}