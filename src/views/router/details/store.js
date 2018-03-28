import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    data: "data"
  },
  getters: {
    doneTodos: (state, getters) => {

    }
  },
  mutations: {
    ["SAVE_SCROLLTOP"](state, page) {

    },
  },
  actions: {

  },
  modules: {

  }
})
console.warn("Vuex严格模式：" + store.strict)
export default store;