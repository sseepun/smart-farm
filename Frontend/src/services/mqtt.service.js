
const axios = require('axios');
import { apiHeader } from '../helpers/header';
import { User } from '../models';
// import { io } from 'socket.io-client';
import mqtt from 'mqtt';

export const mqttService = {
  connect
};

function connect(input) {
  try {
    var mqttClient = mqtt.connect(`wss://mqtt.inwini.com:8883`, {
      username: 'ind-mqtt01',
      password: 'WrZhdF22QULTuJ'
    });
    mqttClient.on('connect', function() {
      console.log('MQTT server connected');
      mqttClient.subscribe(`${input.nodeId}/message`, function (err) {
        console.log(err);
      });
    });
    mqttClient.on('message', function (topic, message) {
      console.log(topic, message.toString());
    });
    
    // var mqttClient = mqtt.connect(`wss://test.mosquitto.org:8081`);
    // mqttClient.on('connect',  function() {
    //   mqttClient.subscribe('TopicToSubscribe');
    //   console.log('Connected to MQTT Broker.');
    // });
    // mqttClient.on('message', function(topic, payload) {
    //   console.log(topic);
    //   console.log(payload);
    //   mqttClient.end();
    // });
  } catch (error) {
    console.log('MQTT connection error :', error);
    return null;
  }
}
