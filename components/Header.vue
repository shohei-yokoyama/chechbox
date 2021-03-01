<template>
  <header>
    <v-app-bar app dark color="green accent-4">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title class="title"
        ><NuxtLink to="/">CheckBox</NuxtLink></v-toolbar-title
      >
      <v-tabs v-if="user.uid">
        <v-tab v-for="(menuItem, index) in menuItems" :key="index"
          ><NuxtLink :to="menuItem.url" class="nav-tab">{{
            menuItem.name
          }}</NuxtLink></v-tab
        >
      </v-tabs>
      <v-spacer></v-spacer>
      <div v-if="user.uid" class="d-flex">
        <p class="display-name mb-0 mr-10 mt-2">
          ユーザーネーム：{{ user.displayName }}
        </p>
        <v-btn color="white" class="black--text" @click="logout"
          >ログアウト</v-btn
        >
      </div>
      <v-btn v-else color="white" class="black--text" @click="login"
        >ログイン</v-btn
      >
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" fixed temporary class="black">
      <v-list nav dense>
        <v-item-group v-if="user.uid" class="text-center">
          <v-list-item v-for="(menuItem, index) in menuItems" :key="index">
            <v-list-item-title
              ><NuxtLink :to="menuItem.url" class="nav-tab">{{
                menuItem.name
              }}</NuxtLink></v-list-item-title
            >
          </v-list-item>
          <v-list-item class="justify-center"
            ><v-btn @click="logout">ログアウト</v-btn></v-list-item
          >
        </v-item-group>
        <v-item-group v-else>
          <v-list-item class="justify-center"
            ><v-btn @click="login">ログイン</v-btn></v-list-item
          >
        </v-item-group>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script>
import firebase from 'firebase'
export default {
  data() {
    return {
      user: {},
      drawer: false,
      menuItems: [
        {
          name: '作成',
          url: '/create',
        },
        {
          name: '検索',
          url: '/search',
        },
      ],
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user || {}
    })
  },
  methods: {
    login() {
      this.$store.dispatch('login')
    },
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/')
    },
  },
}
</script>
<style scoped>
.v-application .title {
  font-weight: 600;
  font-size: 28px !important;
  letter-spacing: 1px !important;
  font-family: 'Fredoka One', cursive !important;
}
.v-application .title a {
  text-decoration: none;
  color: white;
}
.nav-tab {
  text-decoration: none;
  color: white;
  font-weight: 600;
}
.display-name {
  font-weight: bold;
  width: 300px;
}
.v-toolbar__title {
  overflow: visible !important;
  margin-right: 50px !important;
}
</style>
