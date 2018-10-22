<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-xs0 offset-sm3>
        <h1 class="mb-2">My page</h1>
        <v-card color="grey lighten-4" >
          <v-layout row>
            <v-flex xs7>
              <v-card-title primary-title>
                <div>
                  <div class="font-weight-bold headline">{{user.email}}</div>
                  <p class="mt-1 mb-0"><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, asperiores, corporis cumq</span></p>
                </div>
              </v-card-title>
            </v-flex>
            <v-flex xs5>
              <v-img
                  src="https://picsum.photos/125/125/?random"
                  height="125px"
                  contain
                  class="mt-3 mr-3"
              ></v-img>
            </v-flex>
          </v-layout>
          <v-card-actions class="pa-3">
            <v-btn
                color="grey"
                :loading="loading"
                :disabled="loading"
                block
                @click="signOut">sign out
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  export default {
    name: "Mypage",
    data() {
      const user = this.$firebase.auth().currentUser
      return {
        user,
        loading: false,
      }
    },
    methods: {
      signOut: function () {
        let self = this
        self.loading = true
        this.$firebase.auth().signOut().then(function () {
          self.loading = false
          self.$router.push("/signin")
        }).catch(function (e) {
          alert(e.message)
          self.loading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>