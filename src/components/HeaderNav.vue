<template>
  <v-toolbar>
    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn flat to="/">ホーム</v-btn>
      <v-btn flat :to="`/user/${user.uid}`" v-if="user">マイページ</v-btn>
      <v-btn flat to="/signin/" v-if="!user">ログイン</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    name: "headerNav",
    data() {
      const user = this.$firebase.auth().currentUser
      return {
        user
      }
    },
    watch: {
      user: function(user) {
        user
      }
    }
  }
</script>

<style scoped>

</style>