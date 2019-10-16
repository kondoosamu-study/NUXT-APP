export default ({ app, store }, inject) => {
    inject('auth', () => !!app.$cookies.get('token'))
    // inject('auth', () => {
    //     console.log(!!app.$cookies.get('token'))
    // })
    // inject('auth', () => {
    //     console.log(store)
    // })
}