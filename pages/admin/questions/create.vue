<template>
  <v-app>
    <v-container>
      <v-layot>
        <v-flex xs8 offset-2>
          <v-card>
            <v-card-title>
              <h1 class="display-1">Add Questions</h1>
              <v-spacer></v-spacer>
              <n-link to="/admin/questions">
                <v-btn small color="grey darken-2" dark>All Questions</v-btn>
              </n-link>
            </v-card-title>
            <v-card-text>
              <form @submit.prevent="store">
                <v-text-field label="Question" v-model="quiz.question" solo></v-text-field>
                <v-text-field label="Option 1" v-model="quiz.option1" solo></v-text-field>
                <v-text-field label="Option 2" v-model="quiz.option2" solo></v-text-field>
                <v-text-field label="Option 3" v-model="quiz.option3" solo></v-text-field>
                <v-text-field label="Option 4" v-model="quiz.option4" solo></v-text-field>
                <v-flex>
                  <v-radio-group row v-model="correct" :mandatory="false">
                    <p class="mr-4">Choose Correct Answer</p>
                    <v-radio class="m1-4" :value="quiz.option1" label="Option 1"></v-radio>
                    <v-spacer></v-spacer>
                    <v-radio class="m1-4" :value="quiz.option2" label="Option 2"></v-radio>
                    <v-spacer></v-spacer>
                    <v-radio class="m1-4" :value="quiz.option3" label="Option 3"></v-radio>
                    <v-spacer></v-spacer>
                    <v-radio class="m1-4" :value="quiz.option4" label="Option 4"></v-radio>
                    <v-spacer></v-spacer>
                  </v-radio-group>
                  <v-btn class="indigo" block dark type="submit">Add</v-btn>
                </v-flex>
              </form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layot>
    </v-container>
  </v-app>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      quiz: {
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: ''
      },
      correct: ''
    }
  },
  methods: {
    store() {
      this.$axios
        .$post(
          `/questions.json?auth=${this.$axios.defaults.params.auth}`,
          // `/questions.json`,
          this.quiz
        )
        .then(res => {
          // this.storeAnswer(res.data.name)
          this.storeAnswer(res.name)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    storeAnswer(id) {
      this.$axios
        .$post(
          `/answers.json?auth=${this.$axios.defaults.params.auth}`,
          // `/answers.json`,
          {
            question_id: id,
            answer: this.correct
          }
        )
        .then(res => {
          this.$router.push('/admin/questions')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
</style>