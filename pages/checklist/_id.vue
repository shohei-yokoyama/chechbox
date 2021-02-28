<template>
  <div>
    <v-card>
      <v-card-title>{{ checkList.checkList.title }}</v-card-title>
    </v-card>
  </div>
</template>

<script>
import firebase from 'firebase'
const db = firebase.firestore()
const checkListRef = db.collection('checkLists')
export default {
  data() {
    return {
      checkList: '',
    }
  },
  created() {
    const id = this.$route.params.id
    checkListRef
      .doc(id)
      .get()
      .then((doc) => {
        this.checkList = doc.data()
      })
  },
}
</script>

<style scoped>
.checkList-title {
  text-align: center;
}
.done {
  text-decoration: line-through;
}
</style>
