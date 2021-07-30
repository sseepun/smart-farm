import { userService, mqttService } from '../services';
import mqtt from 'mqtt';

export const mqttConn = {
  namespaced: true,

  state: {
    mqttClient: null,
    farm: null
  },
  
  getters: {
    mqttClient: state => state.mqttClient,
    farm: state => state.farm
  },

  // Asynchronous 
  actions: {
    init({ dispatch, commit }) {
      var mqttClient = mqtt.connect(`wss://${process.env.VUE_APP_MQTT_SERVER}`, {
        port: Number(process.env.VUE_APP_MQTT_PORT),
        username: process.env.VUE_APP_MQTT_USERNAME,
        password: process.env.VUE_APP_MQTT_PASSWORD
      });
      mqttClient.on('connect', function(){	
        console.log('MQTT server connected', mqttClient.connected);
        commit('updateMqttClient', mqttClient);
      });
      mqttClient.on('message', function(topic, message, packet){
        console.log(topic, message, packet);
      });
    },
    connect({ dispatch, commit, state }, input) {
      if(!state.mqttClient || !state.mqttClient.connected) {
        setTimeout(() => {
          dispatch('connect', input);
        }, 1000);
      } else {
        state.mqttClient.subscribe([
          `${input.nodeId}/message`,
          `${input.nodeId}/ack`,
          `${input.nodeId}/config`,
          `${input.nodeId}/command`
        ], () => console.log(`MQTT ${input.nodeId} subscribe`));
        commit('updateFarm', input);
      }
    },
    disconnect({ commit, state }, input) {
      if(!state.mqttClient || !state.mqttClient.connected) {
        setTimeout(() => {
          dispatch('disconnect', input);
        }, 1000);
      } else {
        state.mqttClient.unsubscribe([
          `${input.nodeId}/message`,
          `${input.nodeId}/ack`,
          `${input.nodeId}/config`,
          `${input.nodeId}/command`
        ], () => console.log(`MQTT ${input.nodeId} unsubscribe`));
        commit('updateFarm', null);
      }
    }
  },
  
  // Synchronous
  mutations: {
    updateMqttClient(state, mqttClient) {
      state.mqttClient = mqttClient;
    },
    updateFarm(state, farm) {
      state.farm = farm;
    }
  }
  
}
