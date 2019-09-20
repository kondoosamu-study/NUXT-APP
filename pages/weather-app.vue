<template>
  <v-app>
    <h1 class="display-1 text-xs-center">Weather App</h1>
    <v-layout v-if="weather" column>
      <v-flex xs12>
        <v-card color="blue-grey darken-2" dark>
          <v-card-text>
            <v-layout justify-center>
              <v-flex class="text-center" xs>
                <h4>Temperature</h4>
                <h1 class="display-1">{{weather.name}}</h1>
                <img :src="icon" alt="weather icon" />
                <p>
                  <span class="display-1">{{ temp() }} &#176;C</span>
                  <span class="caption m1-4">{{weather.weather[0].description}}</span>
                </p>
              </v-flex>
              <v-flex class="text-center" xs>
                <h4>Wind & Presure:</h4>
                <h3
                  class="headline"
                >Wind: {{ weather.wind.speed }} m/s ({{ weather.wind.deg }} &deg;)</h3>
                <h3 class="headline mt-4">Humidity: {{ weather.main.humidity }} %</h3>
                <h3 class="headline mt-4">Pressure: {{weather.main.pressure }} hPa</h3>
              </v-flex>
              <v-flex class="text-center" xs>
                <h4>Other:</h4>
                <h3
                  class="headline"
                >Max Temperature: {{ Math.round(weather.main.temp_max - 273) }} &deg;C</h3>
                <h3
                  class="headline"
                >Min Temperature: {{ Math.round(weather.main.temp_min - 273) }} &deg;C</h3>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 class="mt-4">
        <v-form @submit.prevent="getWeatherInfo">
          <v-text-field label="Enter City Name" solo v-model="city"></v-text-field>
        </v-form>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import { mapState, mapMutations} from 'vuex';
export default {
  layout: 'default',
  // data() {
  //   return {
  //      city: "London",
  //   }
  // },
  computed: {
    ...mapState('weather', ['weather']),
    // weather() {
    //   return this.$store.state.weather.weather
    // },
    city: {
      get() {
        return this.$store.state.weather.city
      },
      set(value) {
        this.$store.commit('weather/setCity', value)
      }
    },
    icon() {
      return this.weather.weather
        ? `https://openweathermap.org/img/wn/${this.weather.weather[0].icon}.png` // 左記はバッククオートでないと${オブジェクト}が読み込まれないので注意。
        : ''
    }
    // ...mapState('weather', [
    //   'city'
    // ])
  },
  fetch({ store, $axios }) {
    return store.dispatch('weather/getWeatherInfo')
    // return $axios
    //   .$get(
    //     `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.WEATHER_APP_ID}`
    //   )
    //   .then(res => {
    //     return store.commit('weather/setWeather', res)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     return err
    //   })
  },
  // async asyncData({ params, $axios }) {
  // axiosを初期インストールしているのでthis.$axiosで使用可能
  // return $axios
  //   .$get(
  //     // `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=2df0fa06a2acbfb16a039bce0ea08fde`
  //     `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.WEATHER_APP_ID}`
  //   )
  //   .then(res => {
  //     console.log(res)
  //     return { weather: res }
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     return { title: err }
  //   })
  // try {
  //   const res = await $axios.$get(
  //     // `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=2df0fa06a2acbfb16a039bce0ea08fde`
  //     `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${process.env.WEATHER_APP_ID}`
  //   )
  //   console.log(res)
  //   return { weather: res }
  //   // 通信で失敗した場合は自動的にcatchに移動する
  // } catch (err) {
  //   console.log(err)
  //   return { title: err.errno }
  // }
  // },
  methods: {
    getWeatherInfo() {
      // this.setCity(this.city)
      // this.$axios
      //   .$get(
      //     `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${process.env.WEATHER_APP_ID}`
      //   )
      //   .then(res => (this.weather = res))
      //   .catch(err => (this.weather = err))
      this.$store.dispatch('weather/getWeatherInfo')
    },
    temp() {
      return this.weather.main ? Math.round(this.weather.main.temp - 273) : ''
    }
    // ...mapMutations('weather', [
    //   'setCity'
    // ])
  }
}
</script>

<style>
</style>