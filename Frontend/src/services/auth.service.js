const axios = require('axios');
import { apiHeader, apiHeaderFormData } from '../helpers/header';
import { User } from '../models';

export const authService = {
  signin,
  refreshToken,
  update,
  updatePassword
};

function signin(input) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `auth/signin`,
      headers: { 'Content-Type': 'application/json' },
      data: {
        username: input.username,
        password: input.password
      },
    }).then(res => {
      if (res.status == 200) {
        resolve({
          user: new User(res.data.user),
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token
        });
      } else {
        reject(res.statusText);
      }
    }).catch(err => {
      reject(err.response.data);
    });
  });
}

function refreshToken(token) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `auth/refresh-token`,
      headers: { 'Content-Type': 'application/json' },
      data: {
        token: token,
      },
    }).then(res => {
      if (res.status == 200) {
        resolve({
          user: new User(res.data.user),
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token
        });
      } else {
        reject(res.statusText);
      }
    }).catch(err => {
      reject(err.response.data);
    });
  });
}

function update(dataset) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'PATCH',
      url: `auth/profile`,
      headers: apiHeader(),
      data: dataset
    }).then(res => {
      if (res.status == 200) {
        resolve(new User(res.data));
      } else {
        reject(res.statusText);
      }
    }).catch(err => {
      reject(err.response.data);
    });
  });
}

function updatePassword(dataset) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'PATCH',
      url: `auth/password`,
      headers: apiHeader(),
      data: dataset
    }).then(res => {
      if (res.status == 200) {
        resolve(new User(res.data));
      } else {
        reject(res.statusText);
      }
    }).catch(err => {
      reject(err.response.data);
    });
  });
}
