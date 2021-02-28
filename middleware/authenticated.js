import { auth } from '../plugins/firebase'
export default function ({ store, redirect }) {
  auth.onAuthStateChanged((user) => {
    if (!user) {
      redirect('/login')
    }
  })
}
