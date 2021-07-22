
const axios = require('axios');
import { apiHeader } from '../helpers/header';
import { User } from '../models';

export const userService = {
  _list,
  create,
  read,
  update,
  _delete
};


function _list(input) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `user/list`,
      headers: apiHeader(),
      data: input
    }).then(res => {
      if (res.status == 200) {
        resolve(res.data.map(function(d){
          return new User(d);
        }));
      } else {
        reject(res.statusText);
      }
    }).catch(err => {
      reject(err.response.data);
    });
  });
}

function create(input) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `user`,
      headers: apiHeader(),
      data: input
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

function read(input) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: `user`,
      headers: apiHeader(),
      params: input
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

function update(input) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'PATCH',
      url: `user`,
      headers: apiHeader(),
      data: input
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

function _delete(input) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'DELETE',
      url: `user`,
      headers: apiHeader(),
      data: input
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
