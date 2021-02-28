import firebase from '@/plugins/firebase.js'

const db = firebase.firestore()

const checkListRef = db.collection('checkLists')

export const state = () => ({
  user: null,
  checkLists: {},
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  deleteUser(state) {
    state.user = null
  },
  addCheckList(state, { checkList, id }) {
    state.checkLists.id = id
    state.checkLists.push(checkList)
  },
}

export const actions = {
  setUser({ commit }, user) {
    commit('setUser', user)
  },
  login() {
    const provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(provider)
    this.$router.push('/')
  },
  logout() {
    firebase.auth().signOut()
    this.$router.push('/')
  },
  deleteUser({ commmit }) {
    // eslint-disable-next-line no-undef
    commit('deleteUser')
  },
  addCheckList({ commit }, checkList, id) {
    checkListRef
      .add({
        checkList,
      })
      .then(function (docRef) {
        checkListRef.doc(docRef.id).update({
          id: docRef.id,
        })
        commit('addCheckList', checkList, id)
      })
      .catch(function (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      })
  },
}

export const getters = {
  userName: (state) => (state.user ? state.user.displayName : ''),
  getUser: (state) => (state.user ? state.user : ''),
  uid: (state) => (state.user ? state.user.uid : null),
  getCheckLists(state) {
    return state.checkLists
  },
}
