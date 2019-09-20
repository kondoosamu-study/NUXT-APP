export default async function ({ $axios, redirect }) {
    try {
        const { token } = await $axios.$post('https://reqres.in/api/login', {
            email: 'eve.holt@reqres.in',
            password: 'cityslicka'
        })
        if (token !== 'QpwL5tke4') {
            redirect('/')
        }
    } catch (ex) {
        redirect('/');
    }

}
