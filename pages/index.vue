<template>
  <v-app>
    <v-layout column justify-center align-center>
      <v-flex xs12 sm8 md6>
        <h1 class="display-2">{{course}}</h1>
        <input v-model="course" type="text" />
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
export default {
  computed: {
    course: {
      get() {
        // return this.$store.state.course
        return this.$store.getters.upperCaseCourse
        // return this.$store.getters.lowerCaseCourse
      },
      set(value) {
        this.$store.commit('setCourse', value)
      }
    }
  }
}
</script>
