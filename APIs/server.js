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
// const corsOptions = {
//   origin: ['', ''],
//   credentials: true,
//   optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(cookieParser());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));


// Routes
require('./routes/auth.routes')(app);
// require('./routes/user.routes')(app);
// require('./routes/farm.routes')(app);


// Set port listening for requests
const PORT = process.env.SERVER_PORT;
server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// Socket.io
// const io = require('socket.io')(server, {
//   cors: {
//     origin: /localhost$/,
//     methods: ['GET', 'POST'],
//     credentials: true
//   }
// });

// io.on('connection', (socket) => {
//   socket.on('join-with-id',(data) => {
//     socket.join(data.user_id);
//     db.User.findById(data.user_id).exec((err,user) => {
//       io.in(data.user_id).emit('receive-notify', {
//         user_id: data.user_id,
//         notification:  user.notification
//       });
//     });
//   });
  
//   socket.on('join', (data) => {
//     socket.join(data.job_id);
//   });

//   socket.on('disconnect', () => {

//   });
// });

// connect to database
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

module.exports = app;