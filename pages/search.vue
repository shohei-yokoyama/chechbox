<template>
  <div class="container-wrapper">
    <p class="text-center mt-10">
      <v-icon>mdi-magnify</v-icon>チェックリストを探す
    </p>
    <v-row>
      <v-col class="mx-auto" cols="md-6 xs-8">
        <v-text-field
          v-model="keyword"
          label="キーワードから絞り込む"
          solo
          clearable
        ></v-text-field>
      </v-col>
    </v-row>
    <div class="text-center mt-10 mb-10">
      <h2>検索結果</h2>
      <ul class="mt-10">
        <li>
          <v-card
            v-for="checkList in search"
            :key="checkList.checkList.title"
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
                      v-for="(checktext, index) in checkList.checkList
                        .checkList"
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
                  </v-card-actions>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
const db = firebase.firestore()
const checkListRef = db.collection('checkLists')
export default {
  data() {
    return {
      keyword: '',
      checkLists: [],
    }
  },
  computed: {
    search() {
      return this.checkLists.filter((checkList) => {
        return checkList.checkList.title.includes(this.keyword)
      })
    },
  },
  mounted() {
    checkListRef.get().then((checkList) => {
      const array = []
      checkList.forEach((val) => {
        array.push(val.data())
        this.checkLists = array
      })
    })
  },
}
</script>

<style scoped>
.container-wrapper {
  width: 100%;
  min-height: 100vh;
}
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
