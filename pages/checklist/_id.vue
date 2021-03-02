<template>
  <div>
    <v-card v-if="checkList" width="60%" class="mx-auto mt-10 text-center">
      <v-card-title class="justify-center">{{
        checkList.checkList.title
      }}</v-card-title>
      <v-row class="justify-center">
        <v-col cols="12">
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-center" width="100px">チェック欄</th>
                <th colspan="2" class="text-center">チェック項目</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(checktext, index) in checkList.checkList.checkList"
                :key="index"
              >
                <td><input type="checkbox" /></td>
                <v-spacer></v-spacer>
                <td class="text-center">{{ checktext.text }}</td>
              </tr>
            </tbody>
          </v-simple-table>
          <v-card-actions>
            <v-btn v-if="!user.uid" disabled class="mx-auto"
              >CSVダウンロード</v-btn
            >
            <VueJsonToCsv
              v-else
              :json-data="csvData"
              :csv-title="checkList.checkList.title"
              :labels="labels"
              class="mx-auto"
            >
              <v-btn @click="download">CSVダウンロード</v-btn></VueJsonToCsv
            >
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import firebase from 'firebase'
import VueJsonToCsv from 'vue-json-to-csv'
const db = firebase.firestore()
const checkListRef = db.collection('checkLists')
export default {
  components: {
    VueJsonToCsv,
  },
  data() {
    return {
      checkList: '',
      csvData: [],
      labels: {
        id: { title: 'チェック欄' },
        text: { title: 'チェック項目' },
      },
      user: {},
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user || {}
    })
    const id = this.$route.params.id
    checkListRef
      .doc(id)
      .get()
      .then((doc) => {
        this.checkList = doc.data()
      })
  },
  methods: {
    download() {
      this.checkList.checkList.checkList.forEach((data) => {
        this.csvData.push({
          id: '',
          text: data.text,
        })
      })
    },
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
@media screen and (max-width: 560px) {
  .v-card {
    width: 90% !important;
  }
}
</style>
