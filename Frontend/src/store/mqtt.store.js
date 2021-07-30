import { userService, mqttService } from '../services';

export const mqtt = {
  namespaced: true,

  state: {
    mqttClient: null
  },
  
  getters: {
    mqttClient: state => state.mqttClient
  },

  // Asynchronous 
  actions: {
    connect({ commit, state }, input) {
      mqttService.connect(input);
    }
  },
  
  // Synchronous
  mutations: {
    
  }
  
}
