export const state = () => ({
    course: 'Nuxt.js for everyone from Udemy!'
})

export const getters = {
    upperCaseCourse(state, getter) {
        return state.course.toUpperCase()
    },
    lowerCaseCourse(state, getter) {
        return getter.upperCaseCourse + state.course.toLowerCase();
    }
}

export const mutations = {
    setCourse(state, payload) {
        state.course = payload
    }
}
