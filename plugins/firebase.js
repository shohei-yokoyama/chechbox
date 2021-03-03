import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import config from '~/firebase.config'

if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(config)
  firebase.analytics()
}

export default firebase
// export const auth = firebase.auth()
