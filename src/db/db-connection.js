var mongoDB = require('config').mongoDB;
exports = mongoose = require('mongoose');

mongoose.connect('mongodb://' + mongoDB.host + ':' + mongoDB.port + "/" + mongoDB.database);
mongoose.set('debug', mongoDB.debug);
exports = Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("db connected!")
});  