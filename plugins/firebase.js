import firebase from 'firebase/app'
import 'firebaes/auth'
import 'firebase/firestore'

if (!firebase.apps.length) {
  // eslint-disable-next-line prefer-const
  let firebaseConfig = {
    apiKey: 'AIzaSyAIhurxVSGYkCqSN910sgUYp3Dka3QSw0Q',
    authDomain: 'check-box-app.firebaseapp.com',
    projectId: 'check-box-app',
    storageBucket: 'check-box-app.appspot.com',
    messagingSenderId: '877488154776',
    appId: '1:877488154776:web:74f3da42ddd14a1c3a48ed',
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)
}

export { firebase }
