<template>
  <v-app>
    <v-container>
      <v-layot>
        <v-flex xs12>
          <v-card>
            <v-card-title>
              <h1 class="display-1">All Questions</h1>
              <v-spacer></v-spacer>
              <n-link to="/admin/questions/create">
                <v-btn small color="grey darken-2" dark>Add</v-btn>
              </n-link>
            </v-card-title>
            <v-card-text>
              <table class="fluid-background">
                <thead>
                  <tr>
                    <td
                      v-for="header in headers"
                      class="text-xs-center"
                      style="padding-right: 25px;"
                    >{{header.text}}</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="question in questions">
                    <td class="text-xs-left" style="padding-right: 25px;">{{question.question}}</td>
                    <td class="text-xs-left" style="padding-right: 25px;">{{ question.option1 }}</td>
                    <td class="text-xs-left" style="padding-right: 25px;">{{ question.option2 }}</td>
                    <td class="text-xs-left" style="padding-right: 25px;">{{ question.option3 }}</td>
                    <td class="text-xs-left" style="padding-right: 25px;">{{ question.option4 }}</td>
                    <td class="text-xs-center" style="padding-right: 25px;">
                      <v-icon small @click="destroy(question.id)">delete</v-icon>/
                      <nuxt-link
                        v-bind:to="{name:'admin-questions-edit',params:{edit:question.id}}"
                      >edit</nuxt-link>
                      <!-- <nuxt-link v-bind:to="{name:'admin-questions',params:{id:question.id}}"> -->
                      <!-- <nuxt-link :to="`/admin/questions/${question.id}`">delete</nuxt-link> -->
                      <!-- <n-link :to="`/admin/questions/${question.id}`">edit</n-link> -->
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- <v-data-table :headers="headers" :items="questions" class="elevation-1">
                <template v-slot:question.action="props">
                  <td class="text-xs-left">{{ prop.item.question }}</td>
                  <td class="text-xs-left">{{ prop.item.option1 }}</td>
                  <td class="text-xs-left">{{ prop.item.option2 }}</td>
                  <td class="text-xs-left">{{ prop.item.option3 }}</td>
                  <td class="text-xs-left">{{ prop.item.option4 }}</td>
                  <td class="text-xs-center">
                    <v-icon>delete</v-icon>
                    <v-icon>edit</v-icon>
                  </td>
                  <td class="text-xs-center">{{ prop.item.delete }}</td>
                  <td class="text-xs-center">{{ prop.item.edit }}</td>
                </template>
              </v-data-table>-->
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
      headers: [
        { text: 'Question', value: 'question' },
        { text: 'Option 1', value: 'option1' },
        { text: 'Option 2', value: 'option2' },
        { text: 'Option 3', value: 'option3' },
        { text: 'Option 4', value: 'option4' },
        { text: 'Action', value: 'action' }
        // { text: 'Delete', value: 'delete' },
        // { text: 'Edit', value: 'edit' }
      ],
      questions: []
    }
  },
  created() {
    this.fetchQuestions()
  },
  methods: {
    fetchQuestions() {
      this.$axios
        .get(`/questions.json`)
        // Objectの中身がkeyの下に配列がある場合、下記のようにして取得する。
        .then(
          res =>
            (this.questions = Object.keys(res.data).map((key, index) => {
              // firebaseを使用したこのプロジェクトでのkeyはデータのidのようなものである。
              // よって、keyをthis.questionに追加したい場合は下記のようにして追加する
              res.data[key].id = key
              return res.data[key]
            }))
        )
        .catch(err => console.log(err))
    },
    destroy(key) {
      this.$axios
        .delete(
          `/questions/${key}.json`
        )
        .then(res => {
          this.fetchAnswer(key)
        })
        .catch(err => console.log(err))
    },
    fetchAnswer(key) {
      this.$axios
        .$get(
          `/answers.json?orderBy?="question_id"`
        )
        .then(res => {
          let answerKeys = Object.keys(res)
          for (var i = 0; i < answerKeys.length; i += 1) {
            if (res[answerKeys[i]].question_id === key) {
              destroyAnswer(answerKeys[i])
            }
          }
        })
        .catch(err => console.log(err))
    },
    destroyAnswer(answerId) {
      this.$axios
        .delete(
          `/answers/${answerId}.json`
        )
        .then(res => this.$route.push('/admin/questions'))
        // .then(res => this.questions.splice(this.questions[key]))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style>
</style>