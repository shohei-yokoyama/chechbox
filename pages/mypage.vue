<template>
  <div class="text-center mt-10 mb-10">
    <h2>マイチェックリスト</h2>
    <ul class="mt-10">
      <li>
        <v-card
          v-for="(checkList, index) in checkLists"
          :key="index"
          width="80%"
          height="420px"
          class="mx-auto mb-10"
        >
          <v-card-title class="justify-center">{{
            checkList.checkList.title
          }}</v-card-title>
          <v-row class="justify-center">
            <v-col cols="10">
              <v-simple-table>
                <thead>
                  <tr>
                    <th colspan="2" class="text-center">チェック項目</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(checktext, index) in checkList.checkList.checkList"
                    :key="index"
                  >
                    <td><input type="checkbox" /></td>
                    <td class="text-left">
                      {{ checktext.text }}
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
              <div class="card__actions">
                <v-card-actions class="card__btn pb-5">
                  <v-btn
                    ><NuxtLink
                      :to="{
                        name: 'checklist-id',
                        params: { id: checkList.id },
                      }"
                      class="link-btn"
                      >詳細を見る</NuxtLink
                    ></v-btn
                  >
                  <v-btn
                    @click="
                      onCopy(checkList.id)
                      dialog = true
                    "
                    >URLをコピー</v-btn
                  >
                </v-card-actions>
              </div>
            </v-col>
          </v-row>
          <v-dialog v-model="dialog" width="300">
            <v-card>
              <v-card-title class="justify-center"
                >コピーしました！</v-card-title
              >
            </v-card>
          </v-dialog>
        </v-card>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase'
const db = firebase.firestore()
const checkListRef = db.collection('checkLists')
export default {
  data() {
    return {
      user: {},
      checkLists: [],
      csvData: [],
      labels: {
        id: { title: 'チェック欄' },
        text: { title: 'チェック項目' },
      },
      dialog: false,
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user || {}
    })
  },
  mounted() {
    checkListRef.get().then((checkList) => {
      const array = []
      checkList.forEach((val) => {
        if (val.data().checkList.user === this.user.uid) {
          array.push(val.data())
        }
        this.checkLists = array
      })
    })
  },
  methods: {
    onCopy(id) {
      const url = 'https://checkbox-app.netlify.app/checklist/' + id
      this.$copyText(url)
    },
  },
}
</script>

<style scoped>
li {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.card__actions {
  display: flex;
  justify-content: center;
}
.card__btn {
  position: absolute;
  bottom: 0;
}
.link-btn {
  text-decoration: none;
  color: black;
}
@media screen and (max-width: 560px) {
  li {
    display: block;
  }
}
</style>
