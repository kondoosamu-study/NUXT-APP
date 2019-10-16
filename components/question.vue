<template>
  <v-card class="mt-4">
    <v-card-title class="deep-purple lighten-3 white--text">
      <h1 class="headline">{{item.question}}</h1>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-radio-group v-model="choosen" row style="display:block;">
          <v-radio :label="item.option1" :color="answerColor()" :value="item.option1"></v-radio>
          <v-spacer></v-spacer>
          <v-radio :label="item.option2" :color="answerColor()" :value="item.option2"></v-radio>
          <v-spacer></v-spacer>
          <v-radio :label="item.option3" :color="answerColor()" :value="item.option3"></v-radio>
          <v-spacer></v-spacer>
          <v-radio :label="item.option4" :color="answerColor()" :value="item.option4"></v-radio>
        </v-radio-group>
      </v-container>
      <v-layout>
        <v-btn @click="handleAnswer" color="purple darken-2" dark small>Submit</v-btn>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    item: { type: Object, default: () => {} },
    id: { type: String, default: '' }
  },
  data() {
    return {
      choosen: '',
      result: null
    }
  },
  methods: {
    handleAnswer() {
      this.$axios
        .$get(`/answers.json?orderBy?="question_id"`)
        .then(res => {
          let answer = ''
          let resKeys = Object.keys(res)
          for (var i = 0; i < resKeys.length; i += 1) {
            if (res[resKeys[i]].question_id === this.id) {
              answer = res[resKeys[i]].answer
            }
          }
          this.verifyAnswer(answer)
        })
        .catch(err => console.log(err))
    },
    verifyAnswer(answer) {
      this.result = answer === this.choosen
      if (this.result) {
        this.$notify({
            group: 'notify',
            title: 'success',
            text: 'Yeah Correct Answer'
        })
      }
    },
    answerColor() {
      if (this.result === null) {
        return 'black'
      }
      return this.result ? 'green' : 'red'
    }
  }
}
</script>

<style>
</style>