<template>
  <div class="login-form">
    <p class="text-center mt-10 mb-10">
      チェックリストを作成・ダウンロードするには、ユーザーログインが必要になります。
    </p>
    <div class="text-center">
      <v-btn @click="login">ログイン</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$store.dispatch('login')
    },
  },
}
</script>

<style>
.login-form {
  width: 100%;
}
</style>
