
const axios = require('axios');
import { apiHeader } from '../helpers/header';
import { Farm } from '../models';

export const farmService = {
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
      url: `farm/list`,
      headers: apiHeader(),
      params: input
    }).then(res => {
      if (res.status == 200) {
        resolve(res.data.map(function(d){
          return new Farm(d);
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
      url: `farm`,
      headers: apiHeader(),
      data: input
    }).then(res => {
      if (res.status == 200) {
        resolve(new Farm(res.data));
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
      url: `farm`,
      headers: apiHeader(),
      params: input
    }).then(res => {
      if (res.status == 200) {
        resolve(new Farm(res.data));
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
      url: `farm`,
      headers: apiHeader(),
      data: input
    }).then(res => {
      if (res.status == 200) {
        resolve(new Farm(res.data));
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
      url: `farm`,
      headers: apiHeader(),
      data: input
    }).then(res => {
      if (res.status == 200) {
        resolve(new Farm(res.data));
      } else {
        reject(res.statusText);
      }
    }).catch(err => {
      reject(err.response.data);
    });
  });
}
