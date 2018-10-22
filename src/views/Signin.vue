<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm4 offset-xs0 offset-sm4>
        <h1>sign in</h1>
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
                 @click="signIn">ログインする
          </v-btn>
        </v-form>
        <v-alert
            :value="true"
            color="error"
            icon="warning"
            v-if="alert.state"
            transition="fade-transition"
            outline
        >{{alert.text}}
        </v-alert>
      </v-flex>
    </v-layout>

  </div>
</template>

<script>
  export default {
    name: "Signin",
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
          v => v.length >= 6 || 'Password must be less than 6 characters'
        ],
        alert: {
          state: false,
          text: ''
        }
      }
    },
    methods: {
      signIn() {
        if (this.$refs.form.validate()) {
          this.loading = true
          this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(result => {
            this.loading = false
            this.$router.push(`/user/${result.user.uid}`)
          })
          .catch(e => {
            this.showAlert(e.message)
            this.loading = false
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

