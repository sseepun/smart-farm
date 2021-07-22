
export const alert = {
  namespaced: true,

  state: {
    value: { type: null, message: null },
    timeout: null
  },

  getters: {
    value: state => state.value
  },

  // Asynchronous 
  actions: {
    updateAlert({ dispatch, commit }, input) {
      commit('update', input);
    },
  },

  // Synchronous
  mutations: {
    update(state, value) {
      state.value = value;
      if(state.timeout) clearTimeout(state.timeout);
      state.timeout = setTimeout(function(){
        state.value = { type: null, message: null };
      }, 3400);
    }
  }

}
