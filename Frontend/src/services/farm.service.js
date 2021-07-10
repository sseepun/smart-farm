
const axios = require('axios');
import { apiHeader } from '../helpers/header';
import { Farm } from '../models';

export const farmService = {
  _list,
  // create,
  read,
  // update,
  // _delete
};


function _list(input) {
  return new Promise((resolve, reject) => {
  //   axios({
  //     method: 'GET',
  //     url: `${process.env.VUE_API_URL}farm_items`,
  //     headers: apiHeader(),
  //     params: {
  //       next_cursor: page,
  //       search: search,
  //       sorting: sorting,
  //       member_id: memberId
  //     }
  //   })
  //   .then(res => {
  //     resolve(res.data);
  //   })
  //   .catch(err => {
  //     resolve(err.response.data);
  //   });
    resolve([1, 2, 3, 4].map(function(d){
      return new Farm({
        id: d, name: 'ฟาร์มอัจฉริยะที่ '+d,
        description: 'แปรงเกษตรผสมผสานที่ใช้ในการเพราะปลูกผักคะน้า ติดตั้งเครื่องมือ IOT'
      });
    }));
  });
}

function create(dataset) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: `${process.env.VUE_API_URL}farm_items/create`,
      headers: apiHeader(),
      data: dataset
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        resolve(err.response.data);
      });
  });
}

function read(input) {
  return new Promise((resolve, reject) => {
    // axios({
    //   method: 'GET',
    //   url: `${process.env.VUE_API_URL}farm_items/detail`,
    //   headers: apiHeader(),
    //   params: dataset
    // })
    // .then(res => {
    //   resolve(res.data);
    // })
    // .catch(err => {
    //   resolve(err.response.data);
    // });
    resolve(new Farm({ 
      id: input.id, name: 'ฟาร์มอัจฉริยะที่ '+input.id,
      description: 'แปรงเกษตรผสมผสานที่ใช้ในการเพราะปลูกผักคะน้า ติดตั้งเครื่องมือ IOT'
    }));
  });
}

function update(dataset) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'PATCH',
      url: `${process.env.VUE_API_URL}farm_items/update`,
      headers: apiHeader(),
      data: dataset
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        resolve(err.response.data);
      });
  });
}

function _delete(dataset) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'DELETE',
      url: `${process.env.VUE_API_URL}farm_items`,
      headers: apiHeader(),
      data: dataset
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        resolve(err.response.data);
      });
  });
}
