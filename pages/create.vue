<template>
  <div class="create-container">
    <h2 class="text-center mt-8 mb-10">チェックシートを作ろう！</h2>
    <v-form>
      <v-row>
        <v-card class="mx-auto input-area">
          <v-col>
            <v-text-field
              v-model="checkLists.title"
              label="チェックリストのタイトルを入力して下さい。"
              cols="12"
              md="4"
              required
            ></v-text-field>
          </v-col>
          <div v-for="(checktext, index) in checkLists.checkList" :key="index">
            <v-col>
              <v-text-field
                v-model="checktext.text"
                label="チェック項目を入力してください。"
                cols="12"
                md="4"
                required
              ></v-text-field>
            </v-col>
          </div>
        </v-card>
      </v-row>
      <div class="add-form text-right">
        <v-btn dark fab small color="black" @click.prevent="add"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
        <v-btn
          v-show="checkLists.checkList.length > 1"
          dark
          fab
          small
          color="black"
          @click.prevent="remove"
          ><v-icon>mdi-minus</v-icon></v-btn
        >
      </div>
      <div class="d-flex justify-center mt-2">
        <div class="text-center mr-10">
          <v-btn @click="addCheckList">登録する</v-btn>
        </div>
        <div class="text-center">
          <v-btn @click="dialog = !dialog">プレビュー</v-btn>
        </div>
        <v-dialog v-model="dialog" light>
          <div>
            <v-card class="modal-content" flat>
              <v-card-title
                v-if="checkLists.title === ''"
                class="justify-center checkList-title"
                >チェックリストのタイトルが入ります</v-card-title
              >
              <v-card-title
                v-model="checkLists.title"
                class="justify-center checkList-title"
                >{{ checkLists.title }}</v-card-title
              >
              <v-row class="mx-0">
                <v-col>
                  <v-form>
                    <div
                      v-for="(checktext, index) in checkLists.checkList"
                      :key="index"
                    >
                      <v-checkbox
                        v-model="checktext.checkbox"
                        :label="checktext.text"
                        :class="{ done: checktext.checkbox }"
                      ></v-checkbox>
                    </div>
                  </v-form>
                </v-col>
              </v-row>
              <div class="text-center pb-5">
                <v-btn class="mr-5" @click.prevent="allCheck"
                  >全てチェック</v-btn
                >
                <v-btn @click.prevent="allReset">全てリセット</v-btn>
              </div>
            </v-card>
          </div>
        </v-dialog>
      </div>
    </v-form>
  </div>
</template>

<script>
import firebase from 'firebase'
// const db = firebase.firestore()
// const checkListRef = db.collection('checkLists')
export default {
  middleware: 'authenticated',
  data() {
    return {
      checkLists: {
        user: {},
        title: '',
        checkList: [{ text: '', checkbox: false }],
      },
      dialog: false,
      absolute: true,
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.checkLists.user = user || {}
    })
  },
  methods: {
    add() {
      const checkList = {
        text: '',
        checkbox: false,
      }
      this.checkLists.checkList.push(checkList)
    },
    remove() {
      this.checkLists.splice(this.checkLists.checkList.length - 1, 1)
    },
    allCheck() {
      this.checkLists.checkList.forEach(function (checktext) {
        checktext.checkbox = true
      })
    },
    allReset() {
      this.checkLists.checkList.forEach(function (checktext) {
        checktext.checkbox = false
      })
    },
    addCheckList() {
      const title = this.checkLists.title
      const checkList = this.checkLists.checkList
      const user = this.checkLists.user.uid
      this.$store.dispatch('addCheckList', { user, title, checkList })
      this.checkLists.title = ''
      this.checkLists.checkList = [{ text: '', checkbox: false }]
      this.$router.push('/')
    },
  },
}
</script>

<style scoped>
.create-container {
  width: 100%;
  min-height: 100vh;
  margin-bottom: 100px;
}
.add-form {
  width: 50%;
  margin: 0 auto;
}
.input-area {
  width: 40%;
}
.v-dialog {
  position: absolute;
  width: 60%;
  /* height: 100%; */
}
.modal-content {
  width: 100%;
  /* height: 100%; */
}
.checkList-title {
  text-align: center;
}
.done {
  text-decoration: line-through;
}
</style>
