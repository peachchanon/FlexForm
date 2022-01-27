import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    windowResize: true
  },
  getters: {
    windowResize: (state) => {
      return state.windowResize
    }
  },
  mutations: {
    flapWindowResize (state) {
      state.windowResize = !state.windowResize
    }
  },
  actions: {
    flapWindowResize (context) {
      context.commit('flapWindowResize')
    }
  },
  modules: {
  }
})
