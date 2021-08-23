import { userService, mqttService } from '../services';
import mqtt from 'mqtt';

export const mqttConn = {
  namespaced: true,

  state: {
    debug: false,
    groupId: null,
    mqttClient: null,
    farm: null,
    dataList: [],
    config: null
  },
  
  getters: {
    mqttClient: state => state.mqttClient,
    farm: state => state.farm,
    dataList: state => state.dataList,
    latestData: state => state.dataList.length? state.dataList[state.dataList.length - 1]: null,
    config: state => state.config
  },

  // Asynchronous 
  actions: {
    init({ dispatch, commit, state }) {
      var mqttClient = mqtt.connect(`wss://${process.env.VUE_APP_MQTT_SERVER}`, {
        port: Number(process.env.VUE_APP_MQTT_PORT),
        username: process.env.VUE_APP_MQTT_USERNAME,
        password: process.env.VUE_APP_MQTT_PASSWORD
      });
      mqttClient.on('connect', function(){	
        if(state.debug) console.log('MQTT server connected', mqttClient.connected);
        commit('updateMqttClient', mqttClient);
      });
      mqttClient.on('message', function(topic, message, packet){
        var topics = topic.split('/');
        commit('alert/updateLoading', false, { root: true });
        if(state.debug) console.log(topics, message.toString());
        if(topics[1] == 'message') {
          var data = JSON.parse(message.toString());
          if(data.id == state.farm.nodeId) commit('updateDataList', data);
        } else if(topics[1] == 'config') {
          var data = JSON.parse(message.toString());
          if(topics[0] == state.farm.nodeId) commit('updateConfig', data);
        } else if(topics[1] == 'ack') {
          dispatch('refreshData');
        }
      });
    },

    connect({ dispatch, commit, state }, input) {
      commit('updateGroupId', input);
      commit('resetDataList');
      commit('resetConfig');
      if(!state.mqttClient || !state.mqttClient.connected) {
        setTimeout(() => {
          dispatch('connect', input);
        }, 1000);
      } else {
        state.mqttClient.subscribe([
          `${state.groupId}/message`,
          `${state.groupId}/ack`,
          `${input.nodeId}/config`
        ], () => {
          if(state.debug) console.log(`MQTT ${input.nodeId} subscribe ${state.groupId}`);
          dispatch('refreshData');
        });
        commit('updateFarm', input);
      }
    },
    disconnect({ commit, state }, input) {
      commit('resetDataList');
      commit('resetConfig');
      if(!state.mqttClient || !state.mqttClient.connected) {
        setTimeout(() => {
          dispatch('disconnect', input);
        }, 1000);
      } else {
        state.mqttClient.unsubscribe([
          `${state.groupId}/message`,
          `${state.groupId}/ack`,
          `${input.nodeId}/config`
        ], () => {
          if(state.debug) console.log(`MQTT ${input.nodeId} unsubscribe ${state.groupId}`);
          commit('resetGroupId');
        });
        commit('updateFarm', null);
      }
    },

    refreshData({ commit, state }, input) {
      if(state.mqttClient && state.mqttClient.connected && state.farm) {
        if(state.debug) console.log(`MQTT ${state.farm.nodeId} refresh data`);
        state.mqttClient.publish(`${state.farm.nodeId}/command`, 'qe');
      }
    },

    springleCommand({ commit, state }, input) {
      commit('alert/updateLoading', true, { root: true });
      state.mqttClient.publish(`${state.farm.nodeId}/command`, input? 'v1': 'v2');
    },
    configCommand({ commit, state }, input) {
      commit('alert/updateLoading', true, { root: true });
      state.mqttClient.publish(
        `${state.farm.nodeId}/config`, 
        JSON.stringify(input), { retain: true }
      );
    },
    
  },
  
  // Synchronous
  mutations: {
    updateMqttClient(state, mqttClient) {
      state.mqttClient = mqttClient;
    },
    resetGroupId(state) {
      state.groupId = null;
    },
    updateGroupId(state, farm) {
      var nodeId = Number(farm.nodeId);
      if(nodeId >= 1 && nodeId < 10) {
        state.groupId = '001';
      }
    },
    updateFarm(state, farm) {
      state.farm = farm;
      state.dataList = [];
      state.config = null;
    },
    resetDataList(state) {
      state.dataList = [];
    },
    updateDataList(state, data) {
      state.dataList.push(data);
    },
    resetConfig(state) {
      state.config = null;
    },
    updateConfig(state, config) {
      state.config = config;
    }
  }
  
}
