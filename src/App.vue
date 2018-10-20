<template>
  <v-app>
    <v-container>
      <div id="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/signin">Signin</router-link>
        <router-link to="/signup">Signup</router-link>
      </div>
      <router-view/>
    </v-container>
  </v-app>
</template>
