<template>
  <v-toolbar class="mb-5">
    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn flat :to="`/user/${user.uid}`" v-if="user">My page</v-btn>
      <v-btn flat to="/signin/">Sign in</v-btn>
      <v-btn flat to="/signup/">Sign up</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    name: "headerNav",
    data() {
      let user = this.$firebase.auth().currentUser
      return {
        user
      }
    },
  }
</script>

<style scoped>

</style>