<template>
  <v-app>
    <v-container>
      <v-layout>
        <v-flex>
          <v-card>
            <v-card-title>
              <h1 class="display-1">Admin Login</h1>
            </v-card-title>
            <v-card-text>
              <v-flex xs12>
                <v-text-field label="Email" type="email" solo single-line v-model="email"></v-text-field>
                <v-text-field label="Password" type="password" solo single-line v-model="password"></v-text-field>
              </v-flex>
              <v-btn block class="indigo" dark @click="login">Login</v-btn>
            </v-card-text>

            <v-card-text>
              <h3>Google</h3>
              <v-btn block class="indigo" dark @click="loginWithGoogle">Googleログイン</v-btn>
            </v-card-text>
            <v-card-text>
              <h3>パスワード忘れた</h3>
              <v-flex xs12>
                <v-text-field
                  label="Email"
                  type="email"
                  solo
                  single-line
                  v-model="resetPasswordEmail"
                ></v-text-field>
              </v-flex>
              <v-btn block class="indigo" dark @click="sendResetPwdMail">メール送信</v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  middleware: 'guest',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      // this.$axios.$post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${process.env.FIREBASE_KEY}`)
      this.$axios
        .$post(
          `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.FIREBASE_KEY}`,
          {
            email: this.email,
            password: this.password,
            returnSecureToken: true
          }
        )
        .then(res => this.handleToken(res.idToken))
    },
    handleToken(token) {
      this.$cookies.set('token', token)
      this.$store.commit('auth/setLoggedIn', true)
      this.$router.push('/admin/questions')
    },
    loginWithGoogle() {
      this.$axios
        .$post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${process.env.FIREBASE_KEY}`,
          {
            requestUri: 'http://localhost:3000/admin/login',
            postBody:
              '887511698747-4hu5cc9nftje6ju40g1dn3vgs1vl8bba.apps.googleusercontent.com',
            returnSecureToken: true,
            returnIdpCredential: true
          }
        )
        .catch(console.log)
    },
    sendResetPwdMail() {
      this.$axios
        .$post(
          `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.FIREBASE_KEY}`,
          {
            requestType: 'PASSWORD_RESET',
            email: this.resetPasswordEmail
          }
        )
        .then(res => console.log('Success', res))
        .catch(console.log)
    }
  }
}
</script>

<style>
</style>