import { authService } from '../services';
import router from '../router';

export const auth = {
  namespaced: true,

  state: {
    user: localStorage.getItem(`${process.env.VUE_APP_PREFIX}_USER`)
      ? JSON.parse(localStorage.getItem(`${process.env.VUE_APP_PREFIX}_USER`))
      : null
  },

  getters: {
    user: state => state.user,
    isSignedin: state => state.user ? true : false,
    isAdmin: state => state.user && state.user.isAdmin
  },

  // Asynchronous 
  actions: {
    checkSignin({ dispatch, commit }) {
      var accessToken = localStorage.getItem(`${process.env.VUE_APP_PREFIX}_TOKEN`);
      var refreshToken = localStorage.getItem(`${process.env.VUE_APP_PREFIX}_REFRESH`);
      if (accessToken && refreshToken) {
        authService.refreshToken(refreshToken)
          .then(data => {
            commit('signinSuccess', data);
          })
          .catch(err => {
            dispatch('signout');
          });
      } else {
        commit('signout');
      }
    },
    signin({ dispatch, commit }, input) {
      return new Promise((resolve, reject) => {
        authService.signin(input)
          .then(data => {
            commit('signinSuccess', data);
            commit('alert/update', { type: 'Success', message: 'เข้าสู่ระบบเรียบร้อยแล้ว' }, { root: true });
            if(data.user.isAdmin) router.push('/admin/dashboard');
            else router.push('/user/dashboard');
          })
          .catch(err => {
            commit('alert/update', { type: 'Warning', message: err.message }, { root: true });
            reject(err);
          });
      });
    },
    signout({ dispatch, commit }) {
      commit('signout');
      commit('alert/update', { type: 'Success', message: 'ออกจากระบบเรียบร้อยแล้ว' }, { root: true });
    },

    update({ dispatch, commit }, input) {
      return new Promise((resolve, reject) => {
        authService.update(input)
          .then(data => {
            commit('updateSuccess', data);
            commit('alert/update', { type: 'Info', message: 'แก้ไขข้อมูลส่วนตัวสำเร็จ' }, { root: true });
            resolve(data);
          })
          .catch(err => {
            commit('alert/update', { type: 'Warning', message: err.message }, { root: true });
            reject(err);
          });
      });
    },
    updatePassword({ dispatch, commit }, input) {
      return new Promise((resolve, reject) => {
        if(!input.newPassword || !input.confirmPassword){
          commit('alert/update', { type: 'Danger', message: 'กรุณาระบุรหัสผ่านใหม่' }, { root: true });
          reject(false);
        }else if(input.newPassword != input.confirmPassword){
          commit('alert/update', { type: 'Danger', message: 'ยืนยันรหัสผ่านไม่ตรงกัน' }, { root: true });
          reject(false);
        }else{
          authService.updatePassword(input)
            .then(data => {
              commit('alert/update', { type: 'Info', message: 'แก้รหัสผ่านสำเร็จ' }, { root: true });
              resolve(data);
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        }
      });
    }
  },

  // Synchronous
  mutations: {
    signinSuccess(state, data) {
      state.user = data.user;
      localStorage.setItem(`${process.env.VUE_APP_PREFIX}_USER`, JSON.stringify(data.user));
      localStorage.setItem(`${process.env.VUE_APP_PREFIX}_TOKEN`, data.accessToken);
      localStorage.setItem(`${process.env.VUE_APP_PREFIX}_REFRESH`, data.refreshToken);
    },
    signinFailed(state) {
      state.user = null;
      localStorage.removeItem(`${process.env.VUE_APP_PREFIX}_USER`);
      localStorage.removeItem(`${process.env.VUE_APP_PREFIX}_TOKEN`);
      localStorage.removeItem(`${process.env.VUE_APP_PREFIX}_REFRESH`);
    },
    signout(state) {
      state.user = null;
      localStorage.removeItem(`${process.env.VUE_APP_PREFIX}_USER`);
      localStorage.removeItem(`${process.env.VUE_APP_PREFIX}_TOKEN`);
      localStorage.removeItem(`${process.env.VUE_APP_PREFIX}_REFRESH`);
      router.push('/auth/signin');
    },

    updateSuccess(state, user) {
      state.user = user;
      localStorage.setItem(`${process.env.VUE_APP_PREFIX}_USER`, JSON.stringify(user));
    }
  }

}
