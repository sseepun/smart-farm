import { farmService } from '../services';

export const farm = {
  namespaced: true,

  state: {
    list: null,
    single: null
  },

  getters: {
    list: state => state.list,
    single: state => state.single
  },

  // Asynchronous 
  actions: {
    getList({ dispatch, commit }, { user }) {
      return new Promise((resolve, reject) => {
        farmService._list({ userId: user.id })
          .then(data => {
            commit('getListSuccess', data);
            resolve(data);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    },
    getSingle({ dispatch, commit }, { user, farmId }) {
      return new Promise((resolve, reject) => {
        farmService.read({ userId: user.id, id: farmId })
          .then(data => {
            commit('getSingleSuccess', data);
            resolve(data);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    }
  },

  // Synchronous
  mutations: {
    getListSuccess(state, list) {
      state.list = list;
    },
    getSingleSuccess(state, single) {
      state.single = single;
    }
  }

}
