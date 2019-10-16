export default ({ app: { $axios, $cookies } }) => {
    const token = $cookies.get('token')
    if (token) {
        // console.log("=====-", token)
        $axios.defaults.params = {}
        $axios.defaults.params.auth = token
        // console.log($axios)
    }
}