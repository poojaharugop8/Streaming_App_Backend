const Express = require('express');
const Mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const server = Express();
const Port = 5000;

const corsOptions = {
  exposedHeaders: "Authorization",
}
server.use(cors(corsOptions));


server.use(Express.json());

server.use(Express.urlencoded({ extended: false }));

server.use(Express.static(path.resolve(__dirname, './build')));

server.use('/user', require('./user'));
server.use('/video', require('./video'));

const dburl = 'mongodb://localhost:27017/holaApp';

server.listen(Port, () => {
  Mongoose.connect(dburl, (err, client) => {
    if (err) {
      console.log('Error in connecting to database', err);
    } else {
      console.log('Connected to database');
    }
  });

  console.log('Server is listening');
});
