<template>
  <v-footer padless color="black" class="footer">
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link.name"
        color="white"
        text
        rounded
        class="footer-btn"
        ><NuxtLink :to="link.url">{{ link.name }}</NuxtLink></v-btn
      >
      <v-col cols="12" class="black py-4 text-center white--text">
        2021 — <strong>CheckBox</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          name: '利用規約',
          url: '/termofservice',
        },
        {
          name: 'プライバシーポリシー',
          url: '/policy',
        },
        {
          name: 'お問い合わせ',
          url: '/contact',
        },
      ],
    }
  },
}
</script>

<style>
.footer-btn a {
  text-decoration: none;
  color: white;
}
</style>
