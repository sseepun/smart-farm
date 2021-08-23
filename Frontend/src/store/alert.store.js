
export const alert = {
  namespaced: true,

  state: {
    value: { type: null, message: null },
    loading: false,
    timeout: null
  },

  getters: {
    value: state => state.value,
    loading: state => state.loading
  },

  // Asynchronous 
  actions: {
    updateAlert({ dispatch, commit }, input) {
      commit('update', input);
    },
    updateLoading({ dispatch, commit }, input) {
      commit('updateLoading', input);
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
    },
    updateLoading(state, value) {
      state.loading = value;
    }
  }

}
