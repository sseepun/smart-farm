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
    getList({ dispatch, commit }, input) {
      return new Promise((resolve, reject) => {
        farmService._list(input)
          .then(data => {
            commit('getListSuccess', data);
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getSingle({ dispatch, commit }, input) {
      return new Promise((resolve, reject) => {
        farmService.read(input)
          .then(data => {
            commit('getSingleSuccess', data);
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    create({ dispatch, commit }, input) {
      return new Promise((resolve, reject) => {
        farmService.create(input)
          .then(data => {
            commit('alert/update', { type: 'Success', message: 'สร้างฟาร์มเรียบร้อยแล้ว' }, { root: true });
            resolve(data);
          })
          .catch(err => {
            commit('alert/update', { type: 'Warning', message: err.message }, { root: true });
            reject(err);
          });
      });
    },
    update({ dispatch, commit }, input) {
      return new Promise((resolve, reject) => {
        farmService.update(input)
          .then(data => {
            commit('alert/update', { type: 'Success', message: 'แก้ไขฟาร์มเรียบร้อยแล้ว' }, { root: true });
            resolve(data);
          })
          .catch(err => {
            commit('alert/update', { type: 'Warning', message: err.message }, { root: true });
            reject(err);
          });
      });
    },
    delete({ dispatch, commit }, input) {
      return new Promise((resolve, reject) => {
        farmService._delete(input)
          .then(data => {
            commit('alert/update', { type: 'Warning', message: 'ลบฟาร์มเรียบร้อยแล้ว' }, { root: true });
            resolve(data);
          })
          .catch(err => {
            commit('alert/update', { type: 'Warning', message: err.message }, { root: true });
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
