<template>
  <v-app>
    <notifications group="notify" />
    <v-toolbar color="indigo" dark class="header">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>
        <nuxt-link to="/">Learning Nuxt</nuxt-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn>
          <nuxt-link class="nuxt-link-exact-active nuxt-link-active" to="/weather-app">Weather App</nuxt-link>
        </v-btn>
        <v-btn>
          <nuxt-link to="/quiz">Quiz App</nuxt-link>
        </v-btn>
        <v-btn flat v-if="$auth()" @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container>
      <nuxt />
    </v-container>
  </v-app>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$auth()
      this.$cookies.remove('token')
      this.$store.commit('auth/setLoggedIn', false)
      this.$router.push('/admin/login')
    }
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
</style>