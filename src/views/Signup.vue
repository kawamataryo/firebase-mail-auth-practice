<template>
  <div>
    <h1>Signup</h1>
    <v-layout row wrap>
      <v-flex xs12 sm4 offset-xs0 offset-sm4>
        <v-alert
            :value="true"
            color="error"
            icon="warning"
            v-if="alert.state"
            transition="fade-transition"
            outline
        >{{alert.text}}
        </v-alert>
        <v-form v-model="valid" lazy-validation ref="form">
          <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
              required
          ></v-text-field>
          <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              required
          ></v-text-field>
          <v-btn block color="primary"
                 :loading="loading"
                 :disabled="loading"
                 @click="signUp">signup
          </v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: "Signup",
    data() {
      return {
        loading: false,
        valid: false,
        email: '',
        password: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => v.length <= 8 || 'Password must be less than 8 characters'
        ],
        alert: {
          state: false,
          text: ''
        }
      }
    },
    methods: {
      signUp() {
        if (this.$refs.form.validate()) {
          this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(result => {
            this.$router.push(`/user/${result.user.uid}`)
          })
          .catch(e => {
            this.showAlert(e.message)
          })
        }
      },
      clear() {
        this.name = ''
        this.email = ''
        this.$validator.reset()
      },
      showAlert(text) {
        this.alert.text = text
        this.alert.state = true
        let self = this
        setTimeout(function () {
          self.alert.state = false
        }, 5000)
      }
    }
  }
</script>

<style scoped>

</style>