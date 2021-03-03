import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import config from '~/firebase.config'

if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(config)
}

export default firebase
// export const auth = firebase.auth()
