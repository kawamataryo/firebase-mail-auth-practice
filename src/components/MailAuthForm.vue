<template>
  <div>
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
             v-if="isSignIn"
             @click="signIn">SIGN IN
      </v-btn>
      <v-btn block color="success"
             :loading="loading"
             :disabled="loading"
             v-if="!isSignIn"
             @click="signUp">SIGN UP
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
  </div>
</template>

<script>
  export default {
    name: "MailAuthForm",
    props: ['isSignIn'],
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
        },
      }
    },
    methods: {
      // 登録
      async signIn() {
        if (this.$refs.form.validate()) {
          this.toggleLoading()
          await this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(result => {
            this.$forceUpdate()
            this.$router.push(`/user/${result.user.uid}`)
          })
          .catch(e => {
            this.showAlert(e.message)
            this.clear()
          })
          this.toggleLoading()
        }
      },
      // ログイン
      async signUp() {
        if (this.$refs.form.validate()) {
          this.toggleLoading()
          await this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(result => {
            this.loading = false
            this.$forceUpdate()
            this.$router.push(`/user/${result.user.uid}`)
          })
          .catch(e => {
            this.showAlert(e.message)
            this.clear()
          })
          this.toggleLoading()
        }
      },
      // フォームクリア
      clear() {
        this.name = ''
        this.email = ''
        this.$refs.form.reset()
      },
      // アラート表示
      showAlert(text) {
        this.alert.text = text
        this.alert.state = true
        let self = this
        setTimeout(function () {
          self.alert.state = false
        }, 5000)
      },
      // ローディング状態を変化させる
      toggleLoading() {
        this.loading = !this.loading
      }
    }
  }
</script>

