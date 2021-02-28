import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import config from '~/firebase.config'

if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(config)
}

export default firebase
export const auth = firebase.auth()
