<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm4 offset-xs0 offset-sm4>
        <h1>Sign Up</h1>
        <mail-auth-form
            :isSignIn="false"
        ></mail-auth-form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import MailAuthForm from "../components/MailAuthForm"

  export default {
    name: "signup",
    components: {
      MailAuthForm
    }
  }
</script>
