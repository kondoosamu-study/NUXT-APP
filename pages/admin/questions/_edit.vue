<template>
  <v-app>
    <v-container>
      <v-layot>
        <v-flex xs8 offset-2>
          <v-card>
            <v-card-title>
              <h1 class="display-1">Edit Questions</h1>
              <v-spacer></v-spacer>
              <n-link to="/admin/questions">
                <v-btn small color="grey darken-2" dark>Back</v-btn>
              </n-link>
            </v-card-title>
            <v-card-text>
              <form @submit.prevent="update">
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
                  <v-btn class="indigo" block dark type="submit">Update</v-btn>
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
      correct: '',
      answer_id: ''
    }
  },
  created() {
    this.get()
    this.getAnswer()
  },
  methods: {
    get() {
      this.$axios
        .get(
          `/questions.json`,
          this.$route.params.edit
        )
        .then(res => (this.quiz = res.data[this.$route.params.edit]))
        .catch(err => {
          console.log(err.response.data)
        })
    },
    update() {
      this.$axios
        .$patch(
          `/questions/${this.$route.params.edit}.json`,
          this.quiz
        )
        // .then(res => this.$router.push('/admin/questions'))
        .then(res => this.updateAnswer())
    },
    getAnswer() {
      this.$axios
        .$get(
          //   `/answers.json?orderBy?="question_id"&startAt="${this.$route.params.edit}"&endAt="${this.$route.params.edit}"`
          `/answers.json?orderBy?="question_id"`
        )
        .then(res => {
          let resKeys = Object.keys(res)
          for (var i = 0; i < resKeys.length; i += 1) {
            //   console.log(resKeys[i], res[resKeys[i]].answer)
            if (res[resKeys[i]].question_id === this.$route.params.edit) {
              this.correct = res[resKeys[i]].answer
              this.answer_id = resKeys[i]
            }
          }
          // this.correct = Object.value(res)[i].answer
        })
        .catch(err => console.log(err))
    },
    updateAnswer() {
      this.$axios
        .patch(
          `/answers/${this.answer_id}.json`,
          { question_id: this.$route.params.edit, answer: this.correct }
        )
        .then(res => this.$router.push('/admin/questions'))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style>
</style>