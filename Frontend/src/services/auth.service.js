const axios = require('axios');
import { apiHeader } from '../helpers/header';
import { User } from '../models';

export const authService = {
  signin,
  refreshToken,
  update,
  updatePassword
};

function signin(input) {
  return new Promise((resolve, reject) => {
    // axios({
    //   method: 'POST',
    //   url: `${process.env.VUE_API_URL}auth/signin`,
    //   headers: { 'Content-Type': 'application/json' },
    //   data: {
    //     auth: auth,
    //     password: password,
    //     device_token: '',
    //     gant_type: 'password'
    //   },
    // })
    // .then(res => {
    //   resolve(res.data);
    // })
    // .catch(err => {
    //   resolve(err.response.data);
    // });
    resolve(new User({
      id: 1, username: 'sseepun', email: 'sarun.seepun@gmail.com',
      access_token: 'access_token', refresh_token: 'refresh_token'
    }));
  });
}

function refreshToken(token) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `${process.env.VUE_API_URL}auth/signin`,
      headers: { 'Content-Type': 'application/json' },
      data: {
        refresh_token: token,
        gant_type: 'refresh_token'
      },
    })
    .then(res => {
      resolve(res.data);
    })
    .catch(err => {
      resolve(err.response.data);
    });
  });
}

function update(dataset) {
  return new Promise((resolve, reject) => {
    // axios({
    //   method: 'PATCH',
    //   url: `${process.env.VUE_API_URL}farm_items/update`,
    //   headers: apiHeader(),
    //   data: dataset
    // })
    //   .then(res => {
    //     resolve(res.data);
    //   })
    //   .catch(err => {
    //     resolve(err.response.data);
    //   });
    resolve(new User(dataset));
  });
}

function updatePassword(dataset) {
  return new Promise((resolve, reject) => {
    // axios({
    //   method: 'PATCH',
    //   url: `${process.env.VUE_API_URL}farm_items/update`,
    //   headers: apiHeader(),
    //   data: dataset
    // })
    //   .then(res => {
    //     resolve(res.data);
    //   })
    //   .catch(err => {
    //     resolve(err.response.data);
    //   });
    resolve(true);
  });
}
