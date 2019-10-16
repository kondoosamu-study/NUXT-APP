<template>
  <v-app>
    <v-layout justify-center class="mt-3 mb-5">
      <v-flex xs8>
        <h1 class="display-1">Quiz page</h1>
        <question v-for="(question, index) in questions" :id="index" :key="index" :item=question></question>
        <!-- <v-card class="mt-4" v-for="(question, index) in questions" :key="index">
          <v-card-title class="deep-purple lighten-3 white--text">
            <h1 class="headline">{{question.question}}</h1>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-radio-group v-model="choosen" row style="display:block;">
                <v-radio :label="question.option1" color="green" value="question.option1"></v-radio>
                <v-spacer></v-spacer>
                <v-radio :label="question.option2" color="green" value="question.option2"></v-radio>
                <v-spacer></v-spacer>
                <v-radio :label="question.option3" color="green" value="question.option3"></v-radio>
                <v-spacer></v-spacer>
                <v-radio :label="question.option4" color="green" value="question.option4"></v-radio>
              </v-radio-group>
            </v-container>
            <v-layout>
              <v-btn @click="handleAnswer" color="purple darken-2" dark small>Submit</v-btn>
            </v-layout>
          </v-card-text>
        </v-card> -->
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import Question from '../../components/question'
export default {
  components: { Question },
  data() {
    return {
      choosen: '',
      questions: {}
    }
  },
  created() {
    this.getQuestions()
    // console.log(this.questions)
  },
  methods: {
    getQuestions() {
      this.$axios
        .get(`/questions.json`)
        // .then(res => (this.questions = res.data))
        .then(res => {
          this.questions = res.data
        })
        .catch(err => console.log(err))
    },
  }
}
</script>

<style>
</style>