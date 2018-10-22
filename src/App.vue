<template>
  <v-app>
    <header-nav></header-nav>
    <v-container>
      <router-view/>
    </v-container>
  </v-app>
</template>

<script>
  import headerNav from "./components/HeaderNav"
  export default {
    name: "app",
    components: {
      headerNav
    }
  }

</script>
