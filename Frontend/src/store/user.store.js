import { userService } from '../services';

export const user = {
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
        userService._list(input)
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
        userService.read(input)
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
        userService.create(input)
          .then(data => {
            commit('alert/update', { type: 'Success', message: 'สร้างบัญชีผู้ใช้ใหม่เรียบร้อย' }, { root: true });
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
        userService.update(input)
          .then(data => {
            commit('alert/update', { type: 'Success', message: 'แก้ไขบัญชีผู้ใช้ใหม่เรียบร้อย' }, { root: true });
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
        userService._delete(input)
          .then(data => {
            commit('alert/update', { type: 'Warning', message: 'ลบบัญชีผู้ใช้ใหม่เรียบร้อย' }, { root: true });
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
