
const axios = require('axios');
import { apiHeader } from '../helpers/header';
import { User } from '../models';
import { io } from 'socket.io-client';

export const socketService = {
  init
};

function init() {
  return io.connect(process.env.VUE_APP_API_URL, {
    withCredentials: false,
    transports : ['websocket']
  });
  // return io(process.env.VUE_APP_API_URL, {
  //   withCredentials: false,
  //   transports : ['websocket']
  // });
}
