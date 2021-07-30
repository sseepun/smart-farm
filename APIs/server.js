const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const path = require('path');
const db = require('./models');
const migrations = require('./migrations');

const app = express();

// Enable helmet security
app.use(helmet());

// Read environtment
require('dotenv').config();


// Give permission for fetch resource
const corsOptions = {
  origin: [ new RegExp('localhost:3000$') ],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(cookieParser());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));


// Routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/farm.routes')(app);


// Set port listening for requests
const PORT = process.env.SERVER_PORT;
server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// MQTT server
// var mqtt = require('mqtt');
// var mqttClient = mqtt.connect({
//   host: process.env.MQTT_SERVER,
//   port: process.env.MQTT_PORT,
//   username: process.env.MQTT_USERNAME,
//   password: process.env.MQTT_PASSWORD
// });
// console.log(mqttClient)

// mqttClient.on('connect', function() {
//   console.log('MQTT server connected');
//   mqttClient.subscribe('001/message', function (err) {
//     console.log(err);
//   });
// });

// mqttClient.on('message', function (topic, message) {
//   console.log(topic, message.toString());
// });


// Socket.io
// const io = require('socket.io')(server, {
//   cors: {
//     origin: /localhost$/,
//     methods: ['GET', 'POST'],
//     credentials: false
//   }
// });

// io.on('connection', (socket) => {
//   socket.on('join', (data) => {
//     console.log(data);
//     socket.join(data);
//   });

//   socket.on('disconnect', () => {
//     console.log('Diasdasdsd')
//   });
// });


// Connect to database
db.mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('Successfully connect to MongoDB.');
  migrations.initial();
}).catch(err => {
  console.error('Connection error', err);
  process.exit();
});


// Initiate app
module.exports = app;