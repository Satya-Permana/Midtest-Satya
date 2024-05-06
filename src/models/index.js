const mongoose = require('mongoose');
const config = require('../core/config');
const logger = require('../core/logger')('app');

const usersSchema = require('./users-schema');

const db = require('../config/keys').mongoURL; // url mongodb

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`DB connected ${db}`))
  .catch((err) => console.log(err));

const User = mongoose.model('users', mongoose.Schema(usersSchema));

module.exports = {
  mongoose,
  User,
};
