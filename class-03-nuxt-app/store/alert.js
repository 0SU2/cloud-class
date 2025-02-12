export const state = () => ({
  show: false,
  message: '',
  type: 'success'
})

export const mutations = {
  setAlert (state, { message, type }) {
    state.show = true
    state.message = message
    state.type = type
  }, // ! Intentamos modificar la mutacion fuera de Vuex, lo cual NO se puede, mutations funciona de manera sincrona mientras que setTimeout es asincrono
  cleanAlert (state) { // ! Creamos una nueva mutacion para limpiar el alert
    state.show = false
    state.message = ''
  }
}

export const actions = {
  showAlert ({ commit }, payload) {
    commit('setAlert', payload) // ! Aqui se llama a la mutacion
    setTimeout(() => {
      commit('cleanAlert') // ! Ocultamos alerta
    }, 3000)
  }
}
